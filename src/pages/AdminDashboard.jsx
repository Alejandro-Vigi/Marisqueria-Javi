// src/pages/AdminDashboard.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

// 🔹 Lista fija de categorías permitidas (mismo orden que el menú)
const CATEGORIES = [
  // Comida
  "Entradas",
  "Guarniciones",
  "Platillos especiales fines de semana",
  "Cocteles",
  "Ensaladas",
  "Caldos y Sopas",
  "Mojarras",
  "Filetes",
  "Camarones",
  "Empapelado",
  "Sanwiches",
  "Platillitos",
  "Antojitos",
  "Postres",

  // Bebidas sin alcohol
  "Bebidas sin alcohol",
  "Bebidas calientes",
  "Bebidas frías",

  // Bebidas con alcohol
  "Cervezas",
  "Vinos",
  "Tequilas",
  "Licores",
  "Whiskys",
  "Rones",
  "Bebidas especiales con alcohol",
];

export default function AdminDashboard() {
  const [platillos, setPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id: null,
    categoria: "",
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  const [saving, setSaving] = useState(false);

  // estados para cloudinary
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // 🔹 Filtros tipo "secciones del menú"
  const [categoriaFiltro, setCategoriaFiltro] = useState("TODO");
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  // 🔹 Modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusModal, setStatusModal] = useState({
    title: "",
    message: "",
    isError: false,
  });

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // 🔹 Modales para logout
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isLogoutStatusOpen, setIsLogoutStatusOpen] = useState(false);

  const navigate = useNavigate();

  async function loadPlatillos() {
    setLoading(true);
    const { data, error } = await supabase
      .from("platillos")
      .select("*")
      .order("id", { ascending: true });

    if (error) console.error(error);
    setPlatillos(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadPlatillos();
  }, []);

  function resetForm() {
    setForm({
      id: null,
      categoria: "",
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: "",
    });
    setUploadError("");
  }

  // 🔹 SUBIR IMAGEN A CLOUDINARY
  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploadingImage(true);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        setUploadError("No se pudo subir la imagen.");
      } else {
        // guardamos la URL de la imagen en el formulario
        setForm((f) => ({ ...f, imagen: data.secure_url }));
      }
    } catch (err) {
      console.error(err);
      setUploadError("Ocurrió un error subiendo la imagen.");
    } finally {
      setUploadingImage(false);
    }
  }

  // 🔹 GUARDAR (crear / actualizar)
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      categoria: form.categoria,
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      imagen: form.imagen || null,
    };

    let error;

    if (form.id) {
      // UPDATE
      const res = await supabase
        .from("platillos")
        .update(payload)
        .eq("id", form.id);
      error = res.error;
    } else {
      // INSERT
      const res = await supabase.from("platillos").insert(payload);
      error = res.error;
    }

    if (error) {
      console.error(error);
      setStatusModal({
        title: "Error",
        message: "No se pudo guardar el platillo.",
        isError: true,
      });
      setIsStatusModalOpen(true);
    } else {
      await loadPlatillos();
      resetForm();
      setIsFormModalOpen(false);
      setStatusModal({
        title: "Éxito",
        message: "Platillo guardado con éxito.",
        isError: false,
      });
      setIsStatusModalOpen(true);
    }
    setSaving(false);
  }

  // 🔹 Abrir modal para crear
  function handleNew() {
    resetForm();
    // si hay filtro por sección, sugerir esa categoría
    setForm((f) => ({
      ...f,
      categoria: categoriaFiltro === "TODO" ? "" : categoriaFiltro,
    }));
    setIsFormModalOpen(true);
  }

  // 🔹 Abrir modal para editar
  function handleEdit(p) {
    setForm({
      id: p.id,
      categoria: p.categoria || "",
      nombre: p.nombre || "",
      descripcion: p.descripcion || "",
      precio: p.precio || "",
      imagen: p.imagen || "",
    });
    setUploadError("");
    setIsFormModalOpen(true);
  }

  // 🔹 Iniciar eliminación (confirmación)
  function askDelete(p) {
    setDeleteTarget(p);
    setIsConfirmDeleteOpen(true);
  }

  // 🔹 Eliminar de verdad
  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);

    const { error } = await supabase
      .from("platillos")
      .delete()
      .eq("id", deleteTarget.id);

    setDeleting(false);
    setIsConfirmDeleteOpen(false);

    if (error) {
      console.error(error);
      setStatusModal({
        title: "Error",
        message: "No se pudo eliminar el platillo.",
        isError: true,
      });
      setIsStatusModalOpen(true);
    } else {
      await loadPlatillos();
      setStatusModal({
        title: "Eliminado",
        message: "Platillo eliminado de forma satisfactoria.",
        isError: false,
      });
      setIsStatusModalOpen(true);
    }
  }

  // 🔹 Confirmar logout (limpia sesión y muestra modal de éxito)
  function confirmLogout() {
    localStorage.removeItem("mj_admin_logged");
    localStorage.removeItem("mj_admin_expiresAt");
    setIsLogoutConfirmOpen(false);
    setIsLogoutStatusOpen(true);
  }

  // 🔹 Ir al menú público
  function goToMenu() {
    setIsLogoutStatusOpen(false);
    navigate("/menu");
  }

  // 🔹 Platillos filtrados por sección
  const platillosFiltrados = useMemo(() => {
    if (categoriaFiltro === "TODO") return platillos;
    return platillos.filter((p) => p.categoria === categoriaFiltro);
  }, [platillos, categoriaFiltro]);

  const etiquetaSeleccionada =
    categoriaFiltro === "TODO" ? "Todo el menú" : categoriaFiltro;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          Administración de platillos
        </h1>

        <div className="flex flex-wrap gap-2 ">
          <button
            type="button"
            onClick={handleNew}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-600 text-white text-xs font-semibold px-4 py-2 hover:bg-cyan-700 transition-colors cursor-pointer"
          >
            <span className="text-lg leading-none">＋</span>
            Añadir platillo
          </button>

          <button
            type="button"
            onClick={() => setIsLogoutConfirmOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 text-xs font-semibold px-4 py-2 bg-red-500 hover:bg-red-700 transition-colors cursor-pointer text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Filtros tipo secciones del menú */}
      <div className="overflow-hidden">
        <div className="px-5 md:px-8 pt-4 pb-4 border-b border-slate-200/70">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-[0.7rem] md:text-xs text-slate-600 tracking-[0.18em] uppercase text-center md:text-left">
              Sección actual:
              <span className="ml-2 inline-flex items-center text-slate-700 px-3 py-1 font-semibold rounded-full">
                {etiquetaSeleccionada}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMostrarCategorias((v) => !v)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-800 px-4 py-2 text-[0.7rem] md:text-xs font-semibold tracking-[0.18em] uppercase bg-transparent text-cyan-800 hover:bg-[#e8f5fa] transition-colors cursor-pointer"
            >
              {mostrarCategorias
                ? "Ocultar secciones del menú"
                : "Ver secciones del menú"}
              <svg
                className={`h-4 w-4 transition-transform ${
                  mostrarCategorias ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            className={`mt-3 md:mt-4 overflow-hidden transition-all duration-300 ease-out ${
              mostrarCategorias
                ? "max-h-[900px] opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-2">
              {/* TODO el menú */}
              <button
                type="button"
                onClick={() => {
                  setCategoriaFiltro("TODO");
                  setMostrarCategorias(false);
                }}
                className={[
                  "px-4 py-2 rounded-full text-[0.7rem] md:text-xs font-semibold tracking-[0.18em] uppercase border transition-colors",
                  categoriaFiltro === "TODO"
                    ? "bg-cyan-800 text-[#fdf6ec] border-cyan-800 shadow-sm"
                    : "bg-[#fdf6ec] text-cyan-800 border-cyan-700/40 hover:bg-[#e8f5fa]",
                ].join(" ")}
              >
                Todo el menú
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategoriaFiltro(cat);
                    setMostrarCategorias(false);
                  }}
                  className={[
                    "px-4 py-2 rounded-full text-[0.7rem] md:text-xs font-semibold tracking-[0.18em] uppercase border transition-colors",
                    categoriaFiltro === cat
                      ? "bg-cyan-800 text-[#fdf6ec] border-cyan-800 shadow-sm"
                      : "bg-[#fdf6ec] text-cyan-800 border-cyan-700/40 hover:bg-[#e8f5fa]",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="mt-3 text-[0.7rem] text-center text-slate-500">
              Elige una sección para ver solo esos platillos, o{" "}
              <span className="font-semibold text-cyan-800">
                &ldquo;Todo el menú&rdquo;
              </span>{" "}
              para ver la lista completa.
            </p>
          </div>
        </div>

        {/* Lista de platillos filtrados */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">
            Platillos registrados
          </h2>

          {loading ? (
            <p className="text-sm text-slate-500">Cargando...</p>
          ) : platillosFiltrados.length === 0 ? (
            <p className="text-sm text-slate-500">
              No hay platillos en esta sección.
            </p>
          ) : (
            <div className="space-y-2">
              {platillosFiltrados.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-2 last:border-b-0 hover:bg-[#E8E0D3] transition-colors rounded-lg px-2"
                >
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-600 font-semibold">
                      {p.categoria}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {p.nombre}{" "}
                      <span className="text-xs text-slate-500">
                        (${Number(p.precio).toFixed(2)})
                      </span>
                    </p>
                    {p.descripcion && (
                      <p className="text-xs text-slate-500 text-justify">
                        {p.descripcion}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => askDelete(p)}
                      className="px-3 py-1 text-xs rounded-full bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 MODAL FORMULARIO (crear / editar) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg md:max-w-2/5 w-full mx-4 p-6 
              max-h-[65vh] overflow-y-auto"
          >
            {/* <-- ALTURA MODIFICADA A 60% */}
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              {form.id ? "Editar platillo" : "Añadir platillo"}
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {/* Categoría */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={form.categoria}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, categoria: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nombre del platillo
                  </label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, nombre: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Precio (MXN)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.precio}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, precio: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={form.descripcion}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, descripcion: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none min-h-20 text-justify"
                  />
                </div>

                {/* Imagen con Cloudinary + URL opcional */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Imagen del platillo
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-xs text-slate-600"
                  />

                  {uploadingImage && (
                    <p className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full border border-slate-400 border-t-transparent animate-spin" />
                      Subiendo imagen...
                    </p>
                  )}

                  {uploadError && (
                    <p className="text-[11px] text-red-600 bg-red-50 border border-red-100 rounded px-2 py-1">
                      {uploadError}
                    </p>
                  )}

                  <input
                    type="url"
                    value={form.imagen}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, imagen: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                    placeholder="O pega una URL de imagen (https://...)"
                  />

                  {form.imagen && (
                    <img
                      src={form.imagen}
                      alt="Preview platillo"
                      className="mt-2 h-full w-full object-cover rounded-lg border border-slate-200"
                    />
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormModalOpen(false);
                    resetForm();
                  }}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-semibold hover:bg-cyan-700 disabled:opacity-60 inline-flex items-center gap-2"
                >
                  {saving && (
                    <span className="h-3 w-3 rounded-full border border-white border-t-transparent animate-spin" />
                  )}
                  {form.id ? "Actualizar platillo" : "Agregar platillo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 MODAL ESTADO (éxito / error) */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6 text-center">
            <h3
              className={`text-lg font-semibold mb-3 ${
                statusModal.isError ? "text-red-600" : "text-emerald-700"
              }`}
            >
              {statusModal.title}
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              {statusModal.message}
            </p>
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* 🔹 MODAL CONFIRMACIÓN ELIMINAR */}
      {isConfirmDeleteOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Eliminar platillo
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              ¿Seguro que deseas eliminar{" "}
              <span className="font-semibold">{deleteTarget.nombre}</span>?
            </p>

            {deleting && (
              <p className="text-xs text-slate-500 mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-slate-400 border-t-transparent animate-spin" />
                Eliminando platillo...
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                disabled={deleting}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 disabled:opacity-60 inline-flex items-center gap-2 cursor-pointer"
                disabled={deleting}
              >
                {deleting && (
                  <span className="h-3 w-3 rounded-full border border-white border-t-transparent animate-spin" />
                )}
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 MODAL CONFIRMACIÓN LOGOUT */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Cerrar sesión
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              ¿Seguro que deseas cerrar la sesión del administrador?
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 inline-flex items-center gap-2 cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 MODAL ESTADO LOGOUT */}
      {isLogoutStatusOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6 text-center">
            <h3 className="text-lg font-semibold mb-3 text-emerald-700">
              Sesión cerrada correctamente
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Tu sesión de administrador se ha cerrado. Puedes seguir viendo el
              menú público del restaurante.
            </p>
            <button
              type="button"
              onClick={goToMenu}
              className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-semibold hover:bg-cyan-700"
            >
              Ir al menú
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
