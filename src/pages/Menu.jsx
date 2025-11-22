import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";

const MANUAL_CATEGORIES = [
  // Mariscos / comida
  "Entradas",
  "Guarniciones",
  "Cocteles",
  "Aguachile (Solo fin de semana)",
  "Caldos y Sopas",
  "Ensaladas",
  "Mojarras",
  "Filetes",
  "Camarones",
  "Empapelado de Mariscos",
  "Spaghetti con camarones (Fin de semana)",
  // Bebidas bar
  "Bebidas sin alcohol",
  "Cariber especial",
  "Cervezas",
  "Bebidas con alcohol",
  "Vinos",
  "Tequilas",
  "Licores",
  "Whiskys",
  "Rones",
  // Cafetería
  "Bebidas calientes",
  "Bebidas frías",
  "Sanwiches",
  "Platillitos",
  "Nachos con sus extras",
  "Hotdog",
  "Papas a la francesa",
  "Postres",
];

export default function Menu() {
  const [platillos, setPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("TODO");

  useEffect(() => {
    async function loadPlatillos() {
      const { data, error } = await supabase
        .from("platillos")
        .select("*")
        .order("categoria", { ascending: true })
        .order("nombre", { ascending: true });

      if (error) {
        console.error("Error cargando platillos:", error);
      } else {
        setPlatillos(data || []);
      }
      setLoading(false);
    }

    loadPlatillos();
  }, []);

  // Agrupar por categoría
  const platillosPorCategoria = useMemo(() => {
    const grupos = new Map();

    for (const p of platillos) {
      const cat = p.categoria || "Otros";
      if (!grupos.has(cat)) grupos.set(cat, []);
      grupos.get(cat).push(p);
    }
    return grupos;
  }, [platillos]);

  // Orden de categorías: primero las manuales en ese orden,
  // luego cualquier categoría extra que haya en la BD.
  const categoriasOrdenadas = useMemo(() => {
    const existentes = Array.from(platillosPorCategoria.keys());

    const extras = existentes.filter(
      (c) => !MANUAL_CATEGORIES.includes(c)
    );

    const manualFiltradas = MANUAL_CATEGORIES.filter((c) =>
      existentes.includes(c)
    );

    return [...manualFiltradas, ...extras];
  }, [platillosPorCategoria]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-slate-600">Cargando menú...</p>
      </section>
    );
  }

  if (!platillos.length) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
          Menú de Marisquería Javi
        </h1>
        <p className="text-slate-500">
          Aún no hay platillos registrados en el sistema.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Encabezado tipo Pacífico */}
        <div className="text-center mb-6">
          <p className="text-[0.7rem] tracking-[0.3em] uppercase text-slate-500">
            Menú de mariscos · cafetería
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-[0.18em] uppercase text-slate-900">
            Menú {" "}
            <span className="text-cyan-800">Marisquería Javi</span>
          </h1>
          <p className="mt-3 text-[0.8rem] md:text-xs text-slate-500 max-w-xl mx-auto">
            Los precios y platillos pueden cambiar sin previo aviso. Pregunta
            por la disponibilidad de especialidades de fin de semana.
          </p>
        </div>

        {/* Tarjeta grande tipo carta */}
        <div className="bg-[#fdf6ec] border border-slate-200 rounded-3xl shadow-[0_18px_40px_rgba(15,23,42,0.12)] overflow-hidden">
          {/* Filtros de categoría arriba */}
          <div className="px-5 md:px-8 pt-6 pb-4 border-b border-slate-200/70">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setCategoriaSeleccionada("TODO")}
                className={[
                  "px-4 py-2 rounded-full text-[0.7rem] md:text-xs font-semibold tracking-[0.18em] uppercase border transition-colors",
                  categoriaSeleccionada === "TODO"
                    ? "bg-cyan-800 text-[#fdf6ec] border-cyan-800 shadow-sm"
                    : "bg-[#fdf6ec] text-cyan-800 border-cyan-700/40 hover:bg-cyan-50",
                ].join(" ")}
              >
                Todo el menú
              </button>

              {categoriasOrdenadas.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoriaSeleccionada(cat)}
                  className={[
                    "px-4 py-2 rounded-full text-[0.7rem] md:text-xs font-semibold tracking-[0.18em] uppercase border transition-colors",
                    categoriaSeleccionada === cat
                      ? "bg-cyan-800 text-[#fdf6ec] border-cyan-800 shadow-sm"
                      : "bg-[#fdf6ec] text-cyan-800 border-cyan-700/40 hover:bg-cyan-50",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="mt-3 text-[0.7rem] text-center text-slate-500">
              Toca una categoría para ver solo esa sección, o{" "}
              <span className="font-semibold text-cyan-800">
                &ldquo;Todo el menú&rdquo;
              </span>{" "}
              para ver la carta completa.
            </p>
          </div>

          {/* Secciones y platillos */}
          <div className="px-5 md:px-10 py-8">
            {categoriasOrdenadas.map((categoria) => {
              const items = platillosPorCategoria.get(categoria) || [];
              if (!items.length) return null;

              if (
                categoriaSeleccionada !== "TODO" &&
                categoriaSeleccionada !== categoria
              ) {
                return null;
              }

              return (
                <section key={categoria} className="mb-10 last:mb-0">
                  {/* Encabezado de sección tipo “CRUDERÍA” */}
                  <p className="text-[0.65rem] tracking-[0.35em] uppercase text-slate-500 mb-1">
                    Sección
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black tracking-[0.25em] text-cyan-900 uppercase mb-4">
                    {categoria}
                  </h2>

                  <div className="space-y-3">
                    {items.map((p) => (
                      <div
                        key={p.id}
                        className="border-b border-slate-200/60 pb-3 last:border-b-0 last:pb-0"
                      >
                        <div className="flex gap-4 items-start">
                          {/* Mini imagen opcional (si existe) */}
                          {p.imagen && (
                            <div className="hidden sm:block shrink-0">
                              <img
                                src={p.imagen}
                                alt={p.nombre}
                                className="h-16 w-16 rounded-md object-cover shadow-sm border border-slate-200"
                              />
                            </div>
                          )}

                          {/* Nombre + descripción */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-3">
                              <h3 className="text-sm md:text-base font-semibold text-slate-900 tracking-tight">
                                {p.nombre}
                              </h3>
                              <p className="text-sm md:text-base font-bold text-emerald-700 whitespace-nowrap">
                                ${Number(p.precio).toFixed(2)}
                              </p>
                            </div>
                            {p.descripcion && (
                              <p className="mt-1 text-xs md:text-sm text-slate-600">
                                {p.descripcion}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
