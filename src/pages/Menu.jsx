import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";

const MANUAL_CATEGORIES = [
  // Mariscos / comida
  "Entradas",
  "Guarniciones",
  "Cocteles",
  "Platillos especiales fines de semana",
  "Caldos y Sopas",
  "Ensaladas",
  "Mojarras",
  "Filetes",
  "Camarones",
  "Empapelado",
  // Bebidas bar
  "Bebidas sin alcohol",
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
  "Antojitos",
  "Postres",
];

export default function Menu() {
  const [platillos, setPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("TODO");
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

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

  // Orden de categorías
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
      <section className="max-w-6xl mx-auto px-4 py-10 bg-[#fdf6ec]">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
          Menú
        </h1>
        <p className="text-slate-500">
          Aún no hay platillos registrados en el sistema.
        </p>
      </section>
    );
  }

  const etiquetaSeleccionada =
    categoriaSeleccionada === "TODO"
      ? "Todo el menú"
      : categoriaSeleccionada;

  return (
    <section className="bg-[#fdf6ec]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Encabezado tipo Pacífico */}
        <div className="text-center mb-6">
          <p className="text-[0.7rem] tracking-[0.3em] uppercase text-slate-500">
            Menú de mariscos · cafetería
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-[0.18em] uppercase text-slate-900">
            Menú
          </h1>
          <p className="mt-3 text-[0.8rem] md:text-xs text-slate-500 max-w-xl mx-auto">
            Los precios y platillos pueden cambiar sin previo aviso.
          </p>
        </div>

        {/* Tarjeta grande tipo carta */}
        <div className="bg-[#fdf6ec] border border-slate-200 rounded-3xl shadow-[0_18px_40px_rgba(15,23,42,0.12)] overflow-hidden">
          {/* Barra compacta + toggle de secciones */}
          <div className="px-5 md:px-8 pt-6 pb-4 border-b border-slate-200/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-[0.7rem] md:text-xs text-slate-600 tracking-[0.18em] uppercase text-center">
                Sección actual:
                <span className="ml-2 inline-flex items-center text-slate-600 px-3 py-1 font-semibold">
                  {etiquetaSeleccionada}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMostrarCategorias((v) => !v)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-800 px-4 py-2 text-[0.7rem] md:text-xs font-semibold tracking-[0.18em] uppercase bg-[#fdf6ec] text-cyan-800 hover:bg-cyan-50 transition-colors"
              >
                {mostrarCategorias
                  ? "Ocultar secciones del menú"
                  : "Ver secciones del menú"}
                <svg
                  className={`h-4 w-4 transition-transform ${
                    mostrarCategorias ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Secciones del menú (colapsables) */}
            <div
              className={`mt-3 md:mt-4 overflow-hidden transition-all duration-300 ease-out ${
                mostrarCategorias
                  ? "max-h-[420px] opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCategoriaSeleccionada("TODO");
                    setMostrarCategorias(false);
                  }}
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
                    onClick={() => {
                      setCategoriaSeleccionada(cat);
                      setMostrarCategorias(false); // 🔥 se cierra automático
                    }}
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
                Elige una sección para ver solo esos platillos, o{" "}
                <span className="font-semibold text-cyan-800">
                  &ldquo;Todo el menú&rdquo;
                </span>{" "}
                para ver la carta completa.
              </p>
            </div>
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
                          {p.imagen && (
                            <div className="hidden sm:block shrink-0">
                              <img
                                src={p.imagen}
                                alt={p.nombre}
                                className="h-16 w-16 rounded-md object-cover shadow-sm border border-slate-200"
                              />
                            </div>
                          )}

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
