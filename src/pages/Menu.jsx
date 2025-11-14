import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Menu() {
  const [platillos, setPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlatillos() {
      const { data, error } = await supabase
        .from("platillos")
        .select("*")
        .order("categoria", { ascending: true });

      if (error) {
        console.error("Error cargando platillos:", error);
      } else {
        setPlatillos(data || []);
      }
      setLoading(false);
    }

    loadPlatillos();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-slate-600">Cargando menú...</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Menú</h1>
      <p className="text-sm text-slate-600 mb-6">
        Los precios y platillos pueden cambiar sin previo aviso.
      </p>

      {platillos.length === 0 ? (
        <p className="text-slate-500">Aún no hay platillos registrados.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {platillos.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
            >
              {p.imagen && (
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-cyan-600 font-semibold mb-1">
                  {p.categoria}
                </p>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">
                  {p.nombre}
                </h2>
                <p className="text-sm text-slate-600 flex-1">
                  {p.descripcion}
                </p>
                <p className="mt-3 text-right text-base font-bold text-emerald-600">
                  ${Number(p.precio).toFixed(2)} MXN
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
