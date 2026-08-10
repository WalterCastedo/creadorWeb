/**
 * Motor de Generación HTML v10
 */
function construirHTML(datos) {
  const phoneClean = (datos.telefono || '').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${phoneClean}?text=Hola,%20quisiera%20más%20información%20sobre%20${encodeURIComponent(datos.nombre || '')}`;

  function renderIcon(iconClass) {
    if (!iconClass || iconClass === 'none') return '';
    return `<i class="${iconClass}"></i>`;
  }

  let animCardClass = "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl";
  if (datos.animationType === 'zoom') {
    animCardClass = "transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl";
  } else if (datos.animationType === 'glow') {
    animCardClass = "transition-all duration-300 hover:shadow-[0_0_25px_rgba(225,29,72,0.3)] hover:-translate-y-1";
  }

  const alignTextClass = datos.heroAlign === 'left' ? 'text-left' : (datos.heroAlign === 'right' ? 'text-right' : 'text-center');

  // Tarjetas de Servicios
  const tarjetasServicios = (datos.serviciosList || []).map((s, idx) => `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm ${animCardClass} group flex flex-col">
      <div class="h-48 overflow-hidden relative bg-slate-100">
        <img src="${s.imagen || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'}" alt="${s.titulo}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
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
            ${renderIcon(s.btnIcon)} <span>${s.btnText || 'Solicitar'}</span>
          </a>
        </div>
      </div>
    </div>
  `).join('\n');

  // Módulo de Horarios (Modo Rangos vs Día por Día)
  let horariosHTML = '';
  let linkHorarios = '';
  if (datos.modHorariosActive) {
    linkHorarios = `<a href="#horarios" class="nav-link hover:text-slate-900">Horarios</a>`;

    let contenidoHorario = '';
    if (datos.horariosModo === 'diario') {
      contenidoHorario = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"><span class="font-bold text-xs text-slate-800 block">Lunes</span><span class="text-xs text-slate-600 font-semibold">${datos.h_lunes}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"><span class="font-bold text-xs text-slate-800 block">Martes</span><span class="text-xs text-slate-600 font-semibold">${datos.h_martes}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"><span class="font-bold text-xs text-slate-800 block">Miércoles</span><span class="text-xs text-slate-600 font-semibold">${datos.h_miercoles}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"><span class="font-bold text-xs text-slate-800 block">Jueves</span><span class="text-xs text-slate-600 font-semibold">${datos.h_jueves}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"><span class="font-bold text-xs text-slate-800 block">Viernes</span><span class="text-xs text-slate-600 font-semibold">${datos.h_viernes}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"><span class="font-bold text-xs text-slate-800 block">Sábado</span><span class="text-xs text-slate-600 font-semibold">${datos.h_sabado}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center col-span-2"><span class="font-bold text-xs text-slate-800 block">Domingo</span><span class="text-xs text-slate-600 font-semibold">${datos.h_domingo}</span></div>
        </div>
      `;
    } else {
      contenidoHorario = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
            <i class="fa-solid fa-calendar-days text-2xl mb-2" style="color: ${datos.colorPrimary}"></i>
            <h3 class="font-bold text-slate-800 text-sm mb-1">Lunes a Viernes</h3>
            <p class="text-slate-600 font-semibold text-sm">${datos.horariosLV}</p>
          </div>
          <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
            <i class="fa-solid fa-clock text-2xl mb-2" style="color: ${datos.colorPrimary}"></i>
            <h3 class="font-bold text-slate-800 text-sm mb-1">Sábados y Domingos</h3>
            <p class="text-slate-600 font-semibold text-sm">${datos.horariosSD}</p>
          </div>
        </div>
      `;
    }

    horariosHTML = `
    <section id="horarios" class="bg-white py-16 px-6 border-t border-slate-100">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <h2 class="text-3xl font-extrabold text-slate-900">${datos.horariosTitulo || 'Horarios de Atención'}</h2>
        ${contenidoHorario}
      </div>
    </section>`;
  }

  // Galería con Modal Lightbox
  let galeriaHTML = '';
  let linkGaleria = '';
  if (datos.modGaleriaActive && (datos.galeriaList || []).length > 0) {
    linkGaleria = `<a href="#galeria" class="nav-link hover:text-slate-900">Galería</a>`;
    const fotos = datos.galeriaList.map(g => `
      <div class="rounded-2xl overflow-hidden shadow-md h-48 group relative cursor-pointer gallery-item" data-full="${g.url}">
        <img src="${g.url}" alt="Galería" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-2xl">
          <i class="fa-solid fa-magnifying-glass-plus"></i>
        </div>
      </div>
    `).join('\n');

    galeriaHTML = `
    <section id="galeria" class="max-w-6xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-black text-center text-slate-900 mb-3">Galería de Fotos</h2>
      <p class="text-center text-slate-500 text-sm mb-10">Haz clic en cualquier imagen para verla en pantalla completa.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">${fotos}</div>
    </section>`;
  }

  // Testimonios
  let testimoniosHTML = '';
  if (datos.modTestimoniosActive && (datos.testimoniosList || []).length > 0) {
    const cards = datos.testimoniosList.map(t => `
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
        <div class="flex items-center gap-1 text-amber-400 text-xs">
          <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
        </div>
        <p class="text-slate-600 text-sm italic">"${t.texto}"</p>
        <p class="font-bold text-slate-800 text-xs">— ${t.cliente}</p>
      </div>
    `).join('\n');

    testimoniosHTML = `
    <section class="bg-slate-100 py-16 px-6 border-t border-slate-200">
      <div class="max-w-6xl mx-auto space-y-10">
        <h2 class="text-3xl font-black text-center text-slate-900">Opiniones de Clientes</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${cards}</div>
      </div>
    </section>`;
  }

  // FAQ
  let faqHTML = '';
  if (datos.modFaqActive && (datos.faqList || []).length > 0) {
    const items = datos.faqList.map(f => `
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-2">
        <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
          <i class="fa-solid fa-circle-question text-emerald-500"></i> ${f.pregunta}
        </h3>
        <p class="text-slate-600 text-sm leading-relaxed pl-6">${f.respuesta}</p>
      </div>
    `).join('\n');

    faqHTML = `
    <section class="max-w-4xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-black text-center text-slate-900 mb-10">Preguntas Frecuentes</h2>
      <div class="space-y-4">${items}</div>
    </section>`;
  }

  const mapEncoded = encodeURIComponent(datos.mapQuery || datos.ubicacion || '');
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

  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#inicio" class="nav-link text-xl font-black text-slate-900 flex items-center gap-2">
        <span class="w-3 h-3 rounded-full" style="background-color: ${datos.colorPrimary}"></span>
        ${datos.nombre}
      </a>
      <div class="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
        <a href="#inicio" class="nav-link hover:text-slate-900">Inicio</a>
        <a href="#servicios" class="nav-link hover:text-slate-900">Servicios</a>
        ${linkHorarios}
        ${linkGaleria}
        <a href="#contacto" class="nav-link hover:text-slate-900">Ubicación</a>
      </div>
      <a href="${waUrl}" target="_blank" class="hidden md:flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg text-xs md:text-sm" style="background-color: ${datos.btnNavColor}">
        ${renderIcon(datos.btnNavIcon)} <span>${datos.btnNavText}</span>
      </a>
      <button id="mobileMenuBtn" type="button" class="md:hidden text-slate-800 p-2 text-xl"><i class="fa-solid fa-bars"></i></button>
    </div>

    <div id="mobileMenu" class="hidden md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-4">
      <a href="#inicio" class="nav-link block font-bold text-slate-700">Inicio</a>
      <a href="#servicios" class="nav-link block font-bold text-slate-700">Servicios</a>
      ${linkHorarios}
      ${linkGaleria}
      <a href="#contacto" class="nav-link block font-bold text-slate-700">Ubicación</a>
    </div>
  </nav>

  <header id="inicio" class="relative min-h-[560px] flex items-center justify-center px-6 py-20 bg-slate-900 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img src="${datos.heroBgUrl}" alt="Portada" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
    </div>
    <div class="max-w-4xl mx-auto relative z-10 space-y-6 ${alignTextClass}">
      <span class="inline-block uppercase tracking-widest text-xs font-extrabold text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full">${datos.categoria}</span>
      <h1 class="text-4xl md:text-6xl font-black" style="color: ${datos.colorTitle}">${datos.tituloHero}</h1>
      <p class="text-base md:text-xl text-slate-200 font-medium max-w-2xl mx-auto">${datos.descripcion}</p>
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

  <section id="servicios" class="max-w-6xl mx-auto px-6 py-20">
    <h2 class="text-3xl md:text-4xl font-black text-center text-slate-900 mb-12">Nuestros Servicios</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${tarjetasServicios}
    </div>
  </section>

  ${horariosHTML}
  ${galeriaHTML}
  ${testimoniosHTML}
  ${faqHTML}

  <section id="contacto" class="bg-slate-100 py-16 px-6 border-t border-slate-200">
    <div class="max-w-6xl mx-auto space-y-8">
      <div class="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="space-y-4">
          <h3 class="text-2xl font-extrabold text-slate-900">${datos.nombre}</h3>
          <p class="text-sm text-slate-600">📍 ${datos.ubicacion} | 📞 ${datos.telefono}</p>
        </div>
        <a href="${waUrl}" target="_blank" class="text-white font-bold px-8 py-4 rounded-2xl shadow-lg" style="background-color: ${datos.btnNavColor}">Contactar por WhatsApp</a>
      </div>
      <div class="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-80">
        <iframe width="100%" height="100%" frameborder="0" src="${mapIframeUrl}"></iframe>
      </div>
    </div>
  </section>

  <footer class="bg-slate-900 text-slate-400 py-10 px-6 text-center text-xs space-y-2">
    <p>&copy; ${new Date().getFullYear()} ${datos.nombre}. Todos los derechos reservados.</p>
  </footer>

  <!-- Modal Lightbox de Galería -->
  <div id="galleryModal" class="fixed inset-0 bg-black/90 z-50 hidden items-center justify-center p-4">
    <button id="closeModal" class="absolute top-6 right-6 text-white text-3xl font-bold"><i class="fa-solid fa-xmark"></i></button>
    <img id="modalImg" src="" class="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain">
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Menú Hamburguesa
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() { mobileMenu.classList.toggle('hidden'); });
      }

      // Smooth scroll para todos los links del menú
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

      // Modal Lightbox de fotos
      const modal = document.getElementById('galleryModal');
      const modalImg = document.getElementById('modalImg');
      const closeModal = document.getElementById('closeModal');

      document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
          const fullUrl = this.getAttribute('data-full');
          if (modal && modalImg && fullUrl) {
            modalImg.src = fullUrl;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
          }
        });
      });

      if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        });
        modal.addEventListener('click', function(e) {
          if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
          }
        });
      }
    });
  </script>
</body>
</html>`;
}