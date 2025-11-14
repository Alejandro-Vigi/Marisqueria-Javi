export default function Contact() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Contacto & Ubicación</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h2 className="font-semibold text-slate-900 mb-2">Horarios</h2>
        <p className="text-sm text-slate-600">
          Lunes a domingo · 12:00 pm – 8:00 pm
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h2 className="font-semibold text-slate-900 mb-2">Contacto</h2>
        <p className="text-sm text-slate-600">Teléfono: 55 0000 0000</p>
        <p className="text-sm text-slate-600">
          WhatsApp: 55 0000 0000 (pedidos y reservaciones)
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h2 className="font-semibold text-slate-900 mb-2">Ubicación</h2>
        <p className="text-sm text-slate-600 mb-2">
          [Aquí pones la dirección real de la marisquería]
        </p>
        <p className="text-xs text-slate-500 mb-2">
          Puedes colocar aquí un mapa de Google embebido más adelante.
        </p>
      </div>
    </section>
  );
}
