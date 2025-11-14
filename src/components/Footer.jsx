import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          © 2025 Marisquería Javi. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-4">
          {/* Simulación de íconos de redes */}
          <a
            href="#"
            className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
          >
            FB
          </a>
          <a
            href="#"
            className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
          >
            IG
          </a>
          <a
            href="#"
            className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
          >
            WA
          </a>

          {/* Enlace Admin */}
          <Link
            to="/admin"
            className="text-xs text-slate-500 hover:text-cyan-700 underline underline-offset-4"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
