// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

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
      alert("Error guardando el platillo");
    } else {
      await loadPlatillos();
      resetForm();
    }
    setSaving(false);
  }

  async function handleEdit(p) {
    setForm({
      id: p.id,
      categoria: p.categoria || "",
      nombre: p.nombre || "",
      descripcion: p.descripcion || "",
      precio: p.precio || "",
      imagen: p.imagen || "",
    });
    setUploadError("");
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar este platillo?")) return;

    const { error } = await supabase.from("platillos").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("No se pudo eliminar el platillo");
    } else {
      await loadPlatillos();
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          Administración de platillos
        </h1>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 grid md:grid-cols-2 gap-4"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Categoría
            </label>
            <input
              type="text"
              value={form.categoria}
              onChange={(e) =>
                setForm((f) => ({ ...f, categoria: e.target.value }))
              }
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Ej. Ceviches, Tostadas..."
              required
            />
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
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none min-h-20"
            />
          </div>

          {/* Imagen con Cloudinary + URL opcional */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Imagen del platillo
            </label>

            {/* input de archivo */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-xs text-slate-600"
            />

            {uploadingImage && (
              <p className="text-[11px] text-slate-500">
                Subiendo imagen...
              </p>
            )}

            {uploadError && (
              <p className="text-[11px] text-red-600 bg-red-50 border border-red-100 rounded px-2 py-1">
                {uploadError}
              </p>
            )}

            {/* campo opcional para pegar URL manual */}
            <input
              type="url"
              value={form.imagen}
              onChange={(e) =>
                setForm((f) => ({ ...f, imagen: e.target.value }))
              }
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="O pega una URL de imagen (https://...)"
            />

            {/* preview */}
            {form.imagen && (
              <img
                src={form.imagen}
                alt="Preview platillo"
                className="mt-2 h-24 w-full object-cover rounded-lg border border-slate-200"
              />
            )}
          </div>

          <div className="flex gap-2 justify-end">
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
              >
                Cancelar edición
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-semibold hover:bg-cyan-700 disabled:opacity-60"
            >
              {form.id ? "Actualizar platillo" : "Agregar platillo"}
            </button>
          </div>
        </div>
      </form>

      {/* Lista de platillos */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h2 className="text-sm font-semibold text-slate-900 mb-3">
          Platillos registrados
        </h2>

        {loading ? (
          <p className="text-sm text-slate-500">Cargando...</p>
        ) : platillos.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aún no hay platillos registrados.
          </p>
        ) : (
          <div className="space-y-2">
            {platillos.map((p) => (
              <div
                key={p.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-2 last:border-b-0"
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
                    <p className="text-xs text-slate-500">{p.descripcion}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 text-xs rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
