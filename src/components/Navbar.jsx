import { Link, NavLink } from "react-router-dom";

const navLinkClass =
  "text-sm font-medium text-slate-600 hover:text-cyan-700 transition-colors";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + nombre */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-lg">
            MJ
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-slate-900">
              Marisquería Javi
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cyan-600">
              Sabor a mar
            </span>
          </div>
        </Link>

        {/* Links de navegación */}
        <div className="flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            Menú
          </NavLink>
          <NavLink to="/acerca" className={navLinkClass}>
            Acerca de
          </NavLink>
          <NavLink to="/contacto" className={navLinkClass}>
            Contacto
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
