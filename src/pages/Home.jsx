import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="bg-[#fdf6ec]">
      {/* HERO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-[1.1fr,1fr] gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-600 font-semibold mb-2">
            Mariscos frescos · Ambiente familiar
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            Sabor del mar directo a tu mesa en{" "}
            <span className="text-cyan-700">Marisquería Javi</span>.
          </h1>
          <p className="text-slate-600 mb-4">
            Platillos abundantes, mariscos frescos y el toque casero que nos
            caracteriza. Ven a disfrutar con tu familia o amigos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="px-4 py-2 rounded-full bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-colors"
            >
              Ver menú
            </Link>
            <Link
              to="/contacto"
              className="px-4 py-2 rounded-full border border-cyan-600 text-cyan-700 text-sm font-semibold hover:bg-cyan-50 transition-colors"
            >
              Ver ubicación
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white">
            <img
              src="https://images.pexels.com/photos/14050274/pexels-photo-14050274.jpeg"
              alt="Platillo de mariscos"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white shadow-md rounded-2xl px-4 py-3 text-xs text-slate-700 max-w-xs">
            <p className="font-bold text-cyan-700">Especialidad de la casa</p>
            <p>Ceviche, cócteles y tostadas con mariscos frescos.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN VISÍTANOS: HORARIOS, CONTACTO, UBICACIÓN, MAPA */}
      <section className="max-w-6xl mx-auto px-4 pb-12 space-y-6">
        <div className="text-center md:text-left space-y-2">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-900">
            Visítanos
          </p>
          <h2 className="text-2xl font-bold text-slate-900">
            Tu marisquería de confianza en Huixquilucan
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Estamos listos para recibirte con mariscos frescos, ambiente
            relajado y atención cálida. Aquí tienes toda la información para
            llegar y comunicarte con nosotros.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.05fr,1.2fr] gap-6 items-start">
          {/* Columna izquierda: info */}
          <div className="space-y-4">
            {/* Horarios */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold">
                  H
                </span>
                Horarios
              </h3>
              <p className="text-sm text-slate-600">
                Martes a domingo · 10:00 am – 6:00 pm
              </p>
            </div>

            {/* Contacto */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-1">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold">
                  C
                </span>
                Contacto
              </h3>
              <p className="text-sm text-slate-600">
                Teléfono:{" "}
                <a
                  href="tel:+525582880633"
                  className="text-cyan-700 hover:underline font-semibold"
                >
                  +52 55 8288 0633
                </a>
              </p>
            </div>

            {/* Ubicación */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-2">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold">
                  U
                </span>
                Ubicación
              </h3>
              <p className="text-sm text-slate-600">
                Marisquería Javi
                <br />
                Carr Huixquilucan Río Hondo 89a
                <br />
                52793 Ciudad de México, Méx.
              </p>
              <a
                href="https://maps.app.goo.gl/WHgJeZXYboxo6vWL9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:underline"
              >
                Ver en Google Maps
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5h10M19 5v10M19 5 5 19"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna derecha: mapa */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              Cómo llegar
            </h3>

            <div className="relative w-full rounded-xl overflow-hidden aspect-4/3">
              <iframe
                title="Mapa Marisquería Javi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.1701715050117!2d-99.3185199239245!3d19.405052041558466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2068c3fe62a5f%3A0xd8c6f9bb02fc5aa1!2sMarisquer%C3%ADa%20Javi!5e0!3m2!1ses-419!2smx!4v1763227418999!5m2!1ses-419!2smx"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="mt-2 text-[0.75rem] text-slate-500 text-center">
              Mapa interactivo
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
