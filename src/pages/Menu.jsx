import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";

// Fuentes SOLO para este componente
const headingFont = {
  fontFamily:
    '"Bebas Neue", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const bodyFont = {
  fontFamily:
    '"Lato", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const MANUAL_CATEGORIES = [
  // 🔹 Comida: lo primero que un cliente busca
  "Entradas",
  "Guarniciones",
  "Platillos especiales fines de semana",
  "Cocteles",
  "Ensaladas",
  "Caldos y Sopas",
  "Mojarras",
  "Filetes",
  "Camarones",
  "Empapelado",
  "Sanwiches",
  "Platillitos",
  "Antojitos",
  "Postres",

  // 🔹 Bebidas sin alcohol (siempre antes que alcohol)
  "Bebidas sin alcohol",
  "Bebidas calientes",
  "Bebidas frías",

  // 🔹 Aquí las bebidas con alcohol
  "Cervezas",
  "Vinos",
  "Tequilas",
  "Licores",
  "Whiskys",
  "Rones",
  "Bebidas especiales con alcohol",
];

// helper para descripción truncada tipo Uber (…)
function truncateDescription(text, max = 120) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

export default function Menu() {
  const [platillos, setPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("TODO");
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  // modal tipo Uber Eats
  const [platilloActivo, setPlatilloActivo] = useState(null);

  // estado para mostrar/ocultar botón "volver arriba"
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  useEffect(() => {
    function handleScroll() {
      // si bajó más de 400px, mostramos el botón
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    // limpiar al desmontar
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

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

    const extras = existentes.filter((c) => !MANUAL_CATEGORIES.includes(c));

    const manualFiltradas = MANUAL_CATEGORIES.filter((c) =>
      existentes.includes(c),
    );

    return [...manualFiltradas, ...extras];
  }, [platillosPorCategoria]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10" style={bodyFont}>
        <p className="text-center text-slate-600">Cargando menú...</p>
      </section>
    );
  }

  if (!platillos.length) {
    return (
      <section
        className="max-w-6xl mx-auto px-4 py-10 bg-[#fdf6ec]"
        style={bodyFont}
      >
        <h1
          className="text-3xl font-extrabold text-slate-900 mb-4"
          style={headingFont}
        >
          Menú
        </h1>
        <p className="text-slate-500">
          Aún no hay platillos registrados en el sistema.
        </p>
      </section>
    );
  }

  const etiquetaSeleccionada =
    categoriaSeleccionada === "TODO" ? "Todo el menú" : categoriaSeleccionada;

  return (
    <section className="bg-[#fdf6ec]" style={bodyFont}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Encabezado tipo Pacífico */}
        <div className="text-center mb-6">
          <p className="text-[0.7rem] tracking-[0.3em] uppercase text-slate-500">
            Menú de mariscos · cafetería
          </p>
          <h1
            className="mt-2 text-4xl md:text-5xl tracking-[0.18em] uppercase text-slate-900"
            style={headingFont}
          >
            MENÚ
          </h1>
          <p className="mt-3 text-[0.8rem] md:text-xs text-slate-500 max-w-xl mx-auto">
            Los precios y platillos pueden cambiar sin previo aviso.
          </p>
        </div>

        {/* 🔹 Barra de “Sección actual / Ver secciones del menú” (sin tarjeta) */}
        <div className="pb-4 mb-6 border-b border-slate-200/70">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-[0.7rem] md:text-xs text-slate-600 tracking-[0.18em] uppercase md:text-left text-center">
              Sección actual:
              <span className="ml-2 inline-flex items-center text-slate-700 px-1 md:px-2 py-1 font-semibold">
                {etiquetaSeleccionada}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMostrarCategorias((v) => !v)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-800 px-4 py-2 text-[0.7rem] md:text-xs font-semibold tracking-[0.18em] uppercase bg-transparent text-cyan-800 hover:bg-[#e8f5fa] transition-colors"
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
                ? "max-h-[900px] opacity-100"
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
                    : "bg-[#fdf6ec] text-cyan-800 border-cyan-700/40 hover:bg-[#e8f5fa]",
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
                    setMostrarCategorias(false); // se cierra automático
                  }}
                  className={[
                    "px-4 py-2 rounded-full text-[0.7rem] md:text-xs font-semibold tracking-[0.18em] uppercase border transition-colors",
                    categoriaSeleccionada === cat
                      ? "bg-cyan-800 text-[#fdf6ec] border-cyan-800 shadow-sm"
                      : "bg-[#fdf6ec] text-cyan-800 border-cyan-700/40 hover:bg-[#e8f5fa]",
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

        {/* 🔹 Secciones y platillos estilo Uber, pero con TUS estilos de texto */}
        <div>
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
                <h2
                  className="text-center text-4xl md:text-5xl text-cyan-900 uppercase mb-6 tracking-[0.25em]"
                  style={headingFont}
                >
                  {categoria}
                </h2>

                {/* grid tipo Uber: 1 columna en móvil, 2 en escritorio */}
                <div className="grid gap-3 md:grid-cols-2">
                  {items.map((p) => {
                    const descPreview = truncateDescription(p.descripcion, 120);

                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlatilloActivo(p)}
                        className="text-left bg-[#F2EBE1] border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex h-full">
                          {/* Texto (respeta tus estilos) */}
                          <div className="flex-1 px-3 py-3 pr-2 flex flex-col justify-center">
                            {/* NOMBRE: mismas clases que tenías */}
                            <h3
                              className="text-lg md:text-2xl text-cyan-900 uppercase tracking-[0.12em] font-semibold"
                              style={headingFont}
                            >
                              {p.nombre}
                            </h3>

                            {/* PRECIO debajo del nombre, pero con tus clases originales */}
                            <p
                              className="text-lg md:text-xl font-medium whitespace-nowrap tracking-[0.12em]"
                              style={headingFont}
                            >
                              ${Number(p.precio).toFixed(2)}
                            </p>

                            {/* DESCRIPCIÓN truncada, mismas clases que tenías */}
                            {p.descripcion && (
                              <p className="mt-1 text-xs md:text-sm text-slate-700 font-medium">
                                {descPreview}
                              </p>
                            )}
                          </div>

                          {/* Imagen con MISMO padding p-3 */}
                          {p.imagen && (
                            <div className="p-3 flex items-center justify-center">
                              <div className="w-28 h-24 md:w-32 md:h-24 rounded-xl overflow-hidden">
                                <img
                                  src={p.imagen}
                                  alt={p.nombre}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* 🔹 Modal tipo ficha de Uber Eats */}
      {platilloActivo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
            style={bodyFont}
          >
            {platilloActivo.imagen && (
              <div className="w-full px-6 pt-6">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={platilloActivo.imagen}
                    alt={platilloActivo.nombre}
                    className="w-full h-56 md:h-64 object-cover"
                  />
                </div>
              </div>
            )}

            <div className="px-5 pb-5 space-y-3">
              {/* Nombre con tu estilo */}
              <h3
                className="text-2xl text-cyan-900 uppercase tracking-[0.12em] font-semibold mt-6"
                style={headingFont}
              >
                {platilloActivo.nombre}
              </h3>

              {/* Precio con mismo estilo */}
              <p
                className="text-lg md:text-xl font-medium whitespace-nowrap tracking-[0.12em]"
                style={headingFont}
              >
                ${Number(platilloActivo.precio).toFixed(2)}
              </p>

              {platilloActivo.descripcion && (
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {platilloActivo.descripcion}
                </p>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPlatilloActivo(null)}
                  className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón "volver arriba" fijo abajo a la derecha */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-11 w-11 rounded-full bg-cyan-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/30 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 focus:ring-offset-[#fdf6ec] transition"
          aria-label="Volver arriba"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </section>
  );
}
