export default function Contact() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">
          Contacto & Ubicación
        </h1>
        <p className="text-sm text-slate-600">
          Ven a disfrutar mariscos frescos, ambiente relajado y servicio
          familiar en Marisquería Javi.
        </p>
      </div>

      {/* Grid principal: info + mapa */}
      <div className="grid md:grid-cols-[1.1fr,1.2fr] gap-6 items-start">
        {/* Columna izquierda: info */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <h2 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold">
                H
              </span>
              Horarios
            </h2>
            <p className="text-sm text-slate-600">
              Martes a domingo · 10:00 am – 6:00 pm
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-1">
            <h2 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold">
                C
              </span>
              Contacto
            </h2>
            <p className="text-sm text-slate-600">
              Teléfono:{" "}
              <a
                href="tel:+525500000000"
                className="text-cyan-700 hover:underline"
              >
                55 8288 0633
              </a>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-2">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold">
                U
              </span>
              Ubicación
            </h2>
            <p className="text-sm text-slate-600">
              Marisquería Javi
              <br />
              Carr Huixquilucan Río Hondo 89a, 52793 Ciudad de México, Méx.
            </p>
            <a
              href="https://maps.app.goo.gl/WHgJeZXYboxo6vWL9"
              target="_blank"
              rel="noreferrer"
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

        {/* Columna derecha: mapa embed responsive */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3">
          <h2 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
              {/* Ícono de ubicación */}
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
          </h2>

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
  );
}
