// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function getNavClasses(isActive) {
  const base =
    "relative md:text-sm text-xs font-semibold tracking-[0.18em] uppercase transition-colors border-b-2 pb-1";

  const active = "text-cyan-900 border-cyan-800 w-35 md:w-auto text-center";
  const inactive =
    "text-slate-600 border-transparent hover:text-cyan-900 hover:border-cyan-800";

  return [base, isActive ? active : inactive].join(" ");
}

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto((prev) => !prev);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-400/30 bg-[#fdf6ec]/95 backdrop-blur-sm">
      {/* Barra principal */}
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
        {/* Logo / Marca */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={cerrarMenu}
        >
          <img
            src="/logo_512.png"
            alt="Logo Marisquería Javi"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold md:text-xl text-lg tracking-[0.25em] text-cyan-900 uppercase">
              Marisquería Javi
            </span>
            <span className="md:text-[0.8rem] text-[0.7rem] text-slate-600 uppercase tracking-[0.28em]">
              Sabor a mar
            </span>
          </div>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-8">
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
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100/70 hover:text-cyan-900 transition-colors"
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
        <nav className="md:hidden border-t border-slate-300/40 bg-[#fdf6ec] shadow-sm">
          <ul className="flex flex-col py-2 text-sm">
            <li className="text-center">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  getNavClasses(isActive) +
                  " inline-block px-4 py-2 text-sm"
                }
                onClick={cerrarMenu}
              >
                Inicio
              </NavLink>
            </li>
            <li className="text-center">
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  getNavClasses(isActive) +
                  " inline-block px-4 py-2 text-sm"
                }
                onClick={cerrarMenu}
              >
                Menú
              </NavLink>
            </li>
            <li className="text-center">
              <NavLink
                to="/acerca"
                className={({ isActive }) =>
                  getNavClasses(isActive) +
                  " inline-block px-4 py-2 text-sm"
                }
                onClick={cerrarMenu}
              >
                Acerca de
              </NavLink>
            </li>
            <li className="text-center">
              <NavLink
                to="/contacto"
                className={({ isActive }) =>
                  getNavClasses(isActive) +
                  " inline-block px-4 py-2 text-sm"
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
