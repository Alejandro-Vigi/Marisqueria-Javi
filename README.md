# 🐟 Marisquería Javi — Sitio Web Oficial  
### Aplicación Web Administrable · React · Supabase · Cloudinary · Netlify

![Banner](https://res.cloudinary.com/dbydniado/image/upload/v1730000000/banner-marisqueria.webp)

Este repositorio contiene el código del **sitio web oficial de Marisquería Javi**, un restaurante familiar ubicado en Huixquilucan, Estado de México.  
La aplicación está construida en **React + Vite**, cuenta con **panel de administración**, autenticación básica, almacenamiento de imágenes en **Cloudinary** y **hosting en Netlify**.  
Es completamente responsiva, con diseño enfocado en estética costera, calidez y experiencia de usuario sencilla.

---

## ⭐ Características principales

### 🧭 1. Sitio público orientado al cliente
- Página principal con hero, estilo cálido y branding del restaurante.  
- Sección de ubicación con mapa interactivo (Google Maps Embed).  
- Sección del menú con categorías colapsables al estilo Uber Eats.  
- Vista de platillo con modal elegante (nombre, precio, descripción e imagen).  
- Navegación con `react-router-dom` y rutas 100% funcionales en Netlify.

---

### 🔐 2. Panel de administración seguro
- Login para administradores (`/admin`).  
- Rutas protegidas mediante `ProtectedRoute`.  
- CRUD completo de platillos conectados a **Supabase**:
  - Crear  
  - Editar  
  - Eliminar  
  - Subir imágenes  
- Filtros por categoría (igual que el menú público).  
- Modales para formularios, confirmaciones y mensajes de estado.

---

### 🗄️ 3. Back-end serverless (Supabase)
- Base de datos PostgreSQL administrada por Supabase.
- Tablas utilizadas:
  - `admins`: credenciales de acceso al panel.  
  - `platillos`: información del menú (nombre, categoría, precio, descripción, imagen).
- Acceso seguro mediante las claves `anon`.

---

### 🖼️ 4. Gestión de imágenes con Cloudinary
- Carga de imágenes desde el panel admin.
- Vista previa de imágenes en tiempo real.
- Uso de `upload_preset` para control de permisos.

---

### ☁️ 5. Hosting con Netlify
- Construcción automática con `npm run build`.  
- Redirección para SPA (Single Page Application) configurada en `netlify.toml`.

---

## 🧱 6. Arquitectura del Proyecto

```
├── src
│ ├── components
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ └── ProtectedRoute.jsx
│ ├── pages
│ │ ├── Home.jsx
│ │ ├── Menu.jsx
│ │ ├── AdminLogin.jsx
│ │ └── AdminDashboard.jsx
│ ├── lib
│ │ └── supabaseClient.js
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── public
│ ├── logo_512.png
│ └── marisqueria_javi_foto.webp
├── .env.local
├── netlify.toml
├── package.json
└── README.md
```

## 🚀 7. Tecnologías utilizadas

| Área | Tecnología |
|------|------------|
| Frontend | React + Vite |
| Routing | react-router-dom |
| Estilos | Tailwind CSS |
| Backend | Supabase (PostgreSQL) |
| Media | Cloudinary |
| Hosting | Netlify |
| Auth | LocalStorage + Supabase |
| Imágenes | WebP (optimización) |

## 📦 8. Base de datos (Supabase)

### Tabla `admins`

| Campo   | Tipo |
|---------|------|
| id      | int  |
| usuario | text |
| password | text |

### Tabla 9. `platillos`

| Campo       | Tipo    | Descripción           |
|-------------|---------|------------------------|
| id          | int     | Identificador          |
| categoria   | text    | Categoría del menú     |
| nombre      | text    | Nombre del platillo    |
| descripcion | text    | Descripción            |
| precio      | numeric | Precio en MXN          |
| imagen      | text    | URL Cloudinary         |

---

## 🔥 10. Flujo del administrador

1. Accede a `/admin`.
2. Introduce usuario y contraseña (validados contra Supabase).
3. Al iniciar sesión:  
   - Se guarda `mj_admin_logged = "1"` en `localStorage`.
4. Acceso permitido a `/admin/platillos`.
5. Desde el panel puede:  
   - Crear platillos  
   - Editar platillos  
   - Eliminar platillos  
   - Subir imágenes a Cloudinary  
   - Filtrar por categoría  

---

## 📱 11. Responsive Design

- Totalmente funcional desde móviles hasta pantallas grandes.
- Navbar con menú hamburguesa animado.
- Tarjetas del menú estilo Uber Eats con grid responsivo.
- Modal para detalle de platillos adaptado a pantallas pequeñas.

## 👨‍🍳 12. Acerca del proyecto

Este sitio web fue desarrollado para **Marisquería Javi**, un restaurante familiar especializado en mariscos frescos.  
El objetivo es ofrecer una experiencia digital moderna, rápida y bonita, además de contar con un panel de administración simple para gestionar el menú.

---

## 📞 13. Contacto

**Marisquería Javi**  
📍 Huixquilucan, Estado de México  
📱 +52 55 8288 0633  
📘 Facebook: https://www.facebook.com/marisqueria.javi/

