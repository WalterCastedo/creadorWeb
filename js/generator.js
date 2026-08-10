/**
 * Motor de Generación HTML v6 Studio (Con Menú Hamburguesa Móvil Integrado)
 */
function construirHTML(datos) {
  const phoneClean = datos.telefono.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${phoneClean}?text=Hola,%20quisiera%20más%20información%20sobre%20${encodeURIComponent(datos.nombre)}`;

  function renderIcon(iconClass) {
    if (!iconClass || iconClass === "none") return "";
    return `<i class="${iconClass}"></i>`;
  }

  let animCardClass =
    "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl";
  if (datos.animationType === "zoom") {
    animCardClass =
      "transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl";
  } else if (datos.animationType === "glow") {
    animCardClass =
      "transition-all duration-300 hover:shadow-[0_0_25px_rgba(225,29,72,0.3)] hover:-translate-y-1";
  }

  const alignTextClass =
    datos.heroAlign === "left"
      ? "text-left"
      : datos.heroAlign === "right"
        ? "text-right"
        : "text-center";

  const tarjetasServicios = datos.serviciosList
    .map(
      (s, idx) => `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm ${animCardClass} group flex flex-col">
      <div class="h-48 overflow-hidden relative bg-slate-100">
        <img src="${s.imagen || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"}" alt="${s.titulo}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <span class="absolute bottom-3 left-4 text-xs font-bold text-white uppercase bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">0${idx + 1}</span>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-extrabold text-slate-800 mb-2">${s.titulo}</h3>
          <p class="text-slate-600 text-sm leading-relaxed">${s.descripcion}</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Disponible</span>
          <a href="${waUrl}" target="_blank" class="text-xs font-bold px-4 py-2 rounded-xl text-white shadow-md flex items-center gap-1.5" style="background-color: ${s.btnColor || datos.colorPrimary}">
            ${renderIcon(s.btnIcon)} <span>${s.btnText || "Solicitar"}</span>
          </a>
        </div>
      </div>
    </div>
  `,
    )
    .join("\n");

  const mapEncoded = encodeURIComponent(datos.mapQuery || datos.ubicacion);
  const mapIframeUrl = `https://maps.google.com/maps?q=${mapEncoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return `<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${datos.nombre} | ${datos.categoria}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-50 text-slate-800 antialiased">

  <!-- Navbar con Hamburguesa Móvil -->
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#inicio" class="nav-link text-xl font-black text-slate-900 flex items-center gap-2">
        <span class="w-3 h-3 rounded-full" style="background-color: ${datos.colorPrimary}"></span>
        ${datos.nombre}
      </a>

      <!-- Links Desktop -->
      <div class="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
        <a href="#inicio" class="nav-link hover:text-slate-900">Inicio</a>
        <a href="#servicios" class="nav-link hover:text-slate-900">Servicios</a>
        <a href="#contacto" class="nav-link hover:text-slate-900">Ubicación</a>
      </div>

      <!-- Botón CTA Desktop -->
      <a href="${waUrl}" target="_blank" class="hidden md:flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg text-xs md:text-sm" style="background-color: ${datos.btnNavColor}">
        ${renderIcon(datos.btnNavIcon)} <span>${datos.btnNavText}</span>
      </a>

      <!-- Botón Hamburguesa Móvil -->
      <button id="mobileMenuBtn" type="button" class="md:hidden text-slate-800 p-2 text-xl focus:outline-none">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>

    <!-- Menú Desplegable Móvil -->
    <div id="mobileMenu" class="hidden md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-4">
      <a href="#inicio" class="nav-link block font-bold text-slate-700 hover:text-slate-900">Inicio</a>
      <a href="#servicios" class="nav-link block font-bold text-slate-700 hover:text-slate-900">Servicios</a>
      <a href="#contacto" class="nav-link block font-bold text-slate-700 hover:text-slate-900">Ubicación</a>
      <div class="pt-2 border-t border-slate-100">
        <a href="${waUrl}" target="_blank" class="flex items-center justify-center gap-2 text-white font-bold px-5 py-3 rounded-xl shadow-md text-sm w-full" style="background-color: ${datos.btnNavColor}">
          ${renderIcon(datos.btnNavIcon)} <span>${datos.btnNavText}</span>
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header id="inicio" class="relative min-h-[560px] flex items-center justify-center px-6 py-20 bg-slate-900 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img src="${datos.heroBgUrl}" alt="Portada" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
    </div>
    <div class="max-w-4xl mx-auto relative z-10 space-y-6 ${alignTextClass}">
      <span class="inline-block uppercase tracking-widest text-xs font-extrabold text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full">
        ${datos.categoria}
      </span>
      <h1 class="text-4xl md:text-6xl font-black leading-tight" style="color: ${datos.colorTitle}">
        ${datos.tituloHero}
      </h1>
      <p class="text-base md:text-xl text-slate-200 font-medium max-w-2xl ${datos.heroAlign === "center" ? "mx-auto" : ""}">
        ${datos.descripcion}
      </p>
      <div class="pt-4 flex flex-wrap gap-4 ${datos.btnAlign}">
        <a href="${waUrl}" target="_blank" class="text-white font-extrabold px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-2" style="background-color: ${datos.btnHero1Color}">
          ${renderIcon(datos.btnHero1Icon)} <span>${datos.btnHero1Text}</span>
        </a>
        <a href="#servicios" class="nav-link text-white border border-white/30 backdrop-blur-md font-bold px-7 py-4 rounded-2xl flex items-center gap-2" style="background-color: ${datos.btnHero2Color}">
          <span>${datos.btnHero2Text}</span> ${renderIcon(datos.btnHero2Icon)}
        </a>
      </div>
    </div>
  </header>

  <!-- Servicios -->
  <section id="servicios" class="max-w-6xl mx-auto px-6 py-20">
    <h2 class="text-3xl md:text-4xl font-black text-center text-slate-900 mb-12">Nuestros Servicios</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${tarjetasServicios}
    </div>
  </section>

  <!-- Ubicación -->
  <section id="contacto" class="bg-slate-100 py-16 px-6 border-t border-slate-200">
    <div class="max-w-6xl mx-auto space-y-8">
      <div class="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="space-y-4 text-center md:text-left">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Ubicación</span>
          <h3 class="text-2xl md:text-3xl font-extrabold text-slate-900">${datos.nombre}</h3>
          <p class="text-sm text-slate-600">📍 ${datos.ubicacion} | 📞 ${datos.telefono}</p>
        </div>
        <a href="${waUrl}" target="_blank" class="text-white font-bold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-2" style="background-color: ${datos.btnNavColor}">
          ${renderIcon(datos.btnNavIcon)} <span>Contactar por WhatsApp</span>
        </a>
      </div>
      <div class="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-80">
        <iframe width="100%" height="100%" frameborder="0" scrolling="no" src="${mapIframeUrl}"></iframe>
      </div>
    </div>
  </section>

  <footer class="bg-slate-900 text-slate-400 py-10 px-6 text-center text-xs space-y-2">
    <p class="font-semibold text-slate-300">&copy; ${new Date().getFullYear()} ${datos.nombre}. Todos los derechos reservados.</p>
    <p class="text-slate-500">📍 ${datos.ubicacion} | 📞 ${datos.telefono}</p>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');

      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('hidden');
        });
      }

      document.addEventListener('click', function(e) {
        const link = e.target.closest('.nav-link');
        if (link) {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
              mobileMenu.classList.add('hidden');
            }
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      });
    });
  </script>

</body>
</html>`;
}
