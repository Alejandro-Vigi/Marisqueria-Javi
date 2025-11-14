import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("usuario", usuario)
      .eq("password", password)
      .single();

    if (error || !data) {
      console.error(error);
      setErrorMsg("Usuario o contraseña incorrectos");
      return;
    }

    localStorage.setItem("mj_admin_logged", "1");
    navigate("/admin/platillos");
  }

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4 text-slate-900">
        Acceso administrador
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        Esta sección es sólo para administración del menú.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Usuario
          </label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-2 py-1">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-colors"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}
