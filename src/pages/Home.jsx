import { Link } from "react-router-dom";

export default function Home() {
  return (
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
        <div className="flex gap-3">
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
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <img
            src="https://images.pexels.com/photos/14050274/pexels-photo-14050274.jpeg"
            alt="Platillo de mariscos"
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 bg-white shadow-md rounded-2xl px-4 py-3 text-xs text-slate-700">
          <p className="font-bold text-cyan-700">Especialidad de la casa</p>
          <p>Ceviche, cócteles y tostadas con mariscos frescos.</p>
        </div>
      </div>
    </section>
  );
}
