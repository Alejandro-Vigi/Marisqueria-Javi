import { Link } from "react-router-dom";

// Fuentes SOLO para esta página (mismas que en Menu.jsx)
const headingFont = {
  fontFamily:
    '"Bebas Neue", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const bodyFont = {
  fontFamily:
    '"Lato", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

export default function Home() {
  return (
    <main className="bg-[#fdf0e2]" style={bodyFont}>
      {/* HERO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-[1.1fr,1fr] gap-10 items-center">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-cyan-700 font-semibold mb-3">
            MARISCOS FRESCOS · AMBIENTE FAMILIAR
          </p>
          <h1
            className="text-4xl md:text-5xl text-slate-900 mb-4 leading-tight tracking-[0.12em] uppercase"
            style={headingFont}
          >
            SABOR DEL MAR DIRECTO A TU MESA
          </h1>
          <p className="text-slate-700 text-sm md:text-base max-w-xl mb-6">
            Platillos abundantes, mariscos frescos y el toque casero que nos
            caracteriza. Ven a disfrutar con tu familia o amigos en{" "}
            <span className="font-semibold text-cyan-800">
              Marisquería Javi
            </span>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="px-5 py-2.5 rounded-full bg-cyan-700 text-[#fdf6ec] text-xs md:text-sm font-semibold tracking-[0.16em] uppercase hover:bg-cyan-800 transition-colors"
            >
              Ver menú
            </Link>
            <a
              href="#mapa"
              className="px-5 py-2.5 rounded-full border border-cyan-700 text-cyan-800 text-xs md:text-sm font-semibold tracking-[0.16em] uppercase hover:bg-[#e8f5fa] transition-colors"
            >
              Ver ubicación
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-[#f2dfc9] shadow-[0_14px_30px_rgba(15,23,42,0.20)]">
            <img
              src="/marisqueria_javi_foto.webp"
              alt="Platillo especial Marisquería Javi"
              className="w-full h-auto object-cover rounded-3xl"
            />

          </div>

          <div className="absolute -bottom-15 md:-bottom-8 -left-4 md:-left-6 bg-[#fdf0e2]/95 border border-[#f2dfc9] rounded-2xl px-4 py-3 text-xs text-slate-800 max-w-xs shadow-[0_10px_22px_rgba(15,23,42,0.20)]">
            <p
              className="text-cyan-900 tracking-[0.18em] uppercase mb-1 md:text-xl font-semibold"
              style={headingFont}
            >
              MOJARRA FRITA DORADA
            </p>
            <p className="text-[0.73rem] md:text-[0.8rem] leading-relaxed">
              Crujiente por fuera, suave por dentro, acompañada de ensalada fresca y preparada al momento.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN VISÍTANOS */}
      <section className="max-w-6xl mx-auto px-4 pb-14 space-y-8 mt-15">
        {/* Encabezado */}
        <div className="text-center space-y-2">
          <p className="text-[0.7rem] font-semibold tracking-[0.3em] uppercase text-cyan-900">
            VISÍTANOS
          </p>
          <h2
            className="text-3xl md:text-4xl text-slate-900 tracking-[0.2em] uppercase"
            style={headingFont}
          >
            TU MARISQUERÍA EN HUIXQUILUCAN
          </h2>
          <p className="text-sm md:text-base text-slate-700 max-w-3xl mx-auto">
            Estamos listos para recibirte con mariscos frescos, ambiente
            relajado y atención cálida. Aquí tienes toda la información para
            llegar y comunicarte con nosotros.
          </p>
        </div>

        {/* Mapa a todo el ancho */}
        <div id="mapa" className="space-y-3 scroll-mt-24">
          <div className="flex items-center justify-between gap-3">
            <h3
              className="text-lg md:text-xl text-cyan-900 tracking-[0.18em] uppercase"
              style={headingFont}
            >
              CÓMO LLEGAR
            </h3>
            <span className="hidden md:inline-block text-[0.7rem] uppercase tracking-[0.2em] text-slate-500">
              Mapa interactivo
            </span>
          </div>

          <div className="relative w-full rounded-3xl overflow-hidden border border-[#ead9c5] shadow-[0_16px_32px_rgba(15,23,42,0.20)] bg-[#fdf6ec]">
            <iframe
              title="Mapa Marisquería Javi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.1701715050117!2d-99.3185199239245!3d19.405052041558466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2068c3fe62a5f%3A0xd8c6f9bb02fc5aa1!2sMarisquer%C3%ADa%20Javi!5e0!3m2!1ses-419!2smx!4v1763227418999!5m2!1ses-419!2smx"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[260px] md:h-[360px]"
            ></iframe>
          </div>

          <p className="md:hidden text-[0.75rem] text-slate-500 text-center">
            Mapa interactivo
          </p>
        </div>
      </section>
    </main>
  );
}
