// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function getNavClasses(isActive) {
  return [
    "md:text-base text-sm font-semibold tracking-tight transition-colors",
    isActive
      ? "text-cyan-700"
      : "text-slate-700 hover:text-cyan-700",
  ].join(" ");
}

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto((prev) => !prev);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between md:justify-between">
        {/* Logo / Marca */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={cerrarMenu}
        >
          <img
            src="/logo_512.png"
            alt="Logo Marisquería Javi"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold md:text-lg text-base tracking-tight text-slate-900">
              Marisquería Javi
            </span>
            <span className="md:text-[0.8rem] text-[0.7rem] text-cyan-600 uppercase tracking-[0.2em]">
              Sabor a mar
            </span>
          </div>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) => getNavClasses(isActive)}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => getNavClasses(isActive)}
          >
            Menú
          </NavLink>
          <NavLink
            to="/acerca"
            className={({ isActive }) => getNavClasses(isActive)}
          >
            Acerca de
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) => getNavClasses(isActive)}
          >
            Contacto
          </NavLink>
        </nav>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
        >
          {menuAbierto ? (
            // Icono "X"
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Icono hamburguesa
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {menuAbierto && (
        <nav className="md:hidden border-t border-slate-200 bg-white shadow-sm">
          <ul className="flex flex-col py-2 text-sm">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  getNavClasses(isActive) +
                  " block text-center px-4 py-2 text-base"
                }
                onClick={cerrarMenu}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  getNavClasses(isActive) +
                  " block text-center px-4 py-2 text-base"
                }
                onClick={cerrarMenu}
              >
                Menú
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/acerca"
                className={({ isActive }) =>
                  getNavClasses(isActive) +
                  " block text-center px-4 py-2 text-base"
                }
                onClick={cerrarMenu}
              >
                Acerca de
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacto"
                className={({ isActive }) =>
                  getNavClasses(isActive) +
                  " block text-center px-4 py-2 text-base"
                }
                onClick={cerrarMenu}
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
