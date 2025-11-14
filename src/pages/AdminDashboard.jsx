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

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              URL de imagen (opcional)
            </label>
            <input
              type="url"
              value={form.imagen}
              onChange={(e) =>
                setForm((f) => ({ ...f, imagen: e.target.value }))
              }
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="https://..."
            />
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
