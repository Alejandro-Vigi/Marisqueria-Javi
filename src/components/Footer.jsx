import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-400/30 bg-[#fdf6ec]">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 text-slate-700">
        <div className="grid gap-8 md:grid-cols-3 text-sm">
          {/* Contacto — en móvil segundo */}
          <div className="space-y-2 text-center md:text-left order-2 md:order-0">
            <h3 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-900">
              Contáctanos
            </h3>

            <a
              href="tel:+525582880633"
              className="text-lg font-semibold text-cyan-900 hover:underline"
            >
              +52 55 8288 0633
            </a>

            <p className="leading-snug">
              Carr Huixquilucan Río Hondo 89a
              <br />
              52793 Ciudad de México, Méx.
            </p>
          </div>

          {/* Marca + redes — en móvil primero */}
          <div className="text-center space-y-3 order-1 md:order-0">
            <h2 className="text-2xl font-black tracking-[0.35em] uppercase text-cyan-900">
              Marisquería Javi
            </h2>
            <p className="text-xs tracking-[0.2em] uppercase text-slate-500">
              Mariscos frescos · Ambiente familiar
            </p>

            <div className="flex justify-center items-center gap-4 mt-2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/marisqueria.javi/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Marisquería Javi"
                className="h-9 w-9 rounded-full border border-cyan-900 flex items-center justify-center hover:bg-cyan-900 hover:text-[#fdf6ec] transition"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07C2 17.1 5.66 21.3 10.44 22v-6.99H7.9v-2.94h2.54V9.83c0-2.5 1.5-3.88 3.8-3.88 1.1 0 2.25.2 2.25.2v2.5h-1.27c-1.25 0-1.64.78-1.64 1.57v1.88h2.79l-.45 2.94h-2.34V22C18.34 21.3 22 17.1 22 12.07z" />
                </svg>
              </a>

              {/* Teléfono */}
              <a
                href="tel:+525582880633"
                aria-label="Llamar a Marisquería Javi"
                className="h-9 w-9 rounded-full border border-cyan-900 flex items-center justify-center hover:bg-cyan-900 hover:text-[#fdf6ec] transition"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1v3.58a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1l-2.3 2.23z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Horarios — en móvil tercero */}
          <div className="space-y-2 text-center md:text-right order-3 md:order-0">
            <h3 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-900">
              Horarios
            </h3>
            <p>Martes a Domingo · 10:00 – 18:00 h</p>
            <div className="mt-3">
            <div className="flex justify-center md:justify-end items-center gap-3 text-xs text-slate-500">
              <Link
                to="/"
                className="hover:text-cyan-900 underline underline-offset-4"
              >
                Inicio
              </Link>
              <span className="text-slate-400">·</span>
              <Link
                to="/menu"
                className="hover:text-cyan-900 underline underline-offset-4"
              >
                Menú
              </Link>
              <span className="text-slate-400">·</span>
              <Link
                to="/admin"
                className="hover:text-cyan-900 underline underline-offset-4"
              >
                Admin
              </Link>
            </div>
          </div>

          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-[11px] text-slate-500">
          © {year} Marisquería Javi · Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
