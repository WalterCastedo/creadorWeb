function construirHTML(datos) {
  const phoneClean = (datos.telefono || '').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${phoneClean}?text=Hola,%20quisiera%20más%20información%20sobre%20${encodeURIComponent(datos.nombre || '')}`;

  function renderIcon(iconClass) {
    if (!iconClass || iconClass === 'none') return '';
    return `<i class="${iconClass}"></i>`;
  }

  function getAnimData(animVal) {
    if (!animVal || animVal === 'none') return '';
    return `data-animate="${animVal}" class="scroll-anim"`;
  }

  let animCardClass = "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl";
  if (datos.animationType === 'zoom') {
    animCardClass = "transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl";
  } else if (datos.animationType === 'glow') {
    animCardClass = "transition-all duration-300 hover:shadow-[0_0_25px_rgba(225,29,72,0.3)] hover:-translate-y-1";
  }

  const alignTextClass = datos.heroAlign === 'left' ? 'text-left' : (datos.heroAlign === 'right' ? 'text-right' : 'text-center');

  let bannerTopHTML = '';
  if (datos.modBannerActive && datos.bannerTexto) {
    bannerTopHTML = `
    <div class="py-3 px-6 text-center text-xs md:text-sm font-extrabold tracking-wide uppercase shadow-inner" style="background-color: ${datos.bannerBgColor || '#e11d48'}; color: ${datos.bannerTextColor || '#ffffff'}">
      ${datos.bannerTexto}
    </div>`;
  }

  let statsHTML = '';
  if (datos.modStatsActive && (datos.statsList || []).length > 0) {
    const boxes = datos.statsList.map(st => {
      const iconHTML = (st.icon && st.icon !== 'none') ? `<i class="${st.icon} text-3xl mb-3" style="color: ${datos.colorPrimary}"></i>` : '';
      return `
      <div class="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-2">
        ${iconHTML}
        <h3 class="text-2xl md:text-3xl font-black text-slate-900">${st.numero}</h3>
        <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider">${st.etiqueta}</p>
      </div>
      `;
    }).join('\n');

    statsHTML = `
    <section class="max-w-6xl mx-auto px-6 md:px-12 py-6 my-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        ${boxes}
      </div>
    </section>`;
  }

  const tarjetasServicios = (datos.serviciosList || []).map((s, idx) => `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm ${animCardClass} group flex flex-col">
      <div class="h-52 overflow-hidden relative bg-slate-100">
        <img src="${s.imagen || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'}" alt="${s.titulo}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <span class="absolute bottom-3 left-4 text-xs font-bold text-white uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-md">0${idx + 1}</span>
      </div>
      <div class="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-extrabold text-slate-800 mb-2">${s.titulo}</h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">${s.descripcion}</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Disponible</span>
          <a href="${waUrl}" target="_blank" class="text-xs font-bold px-5 py-2.5 rounded-xl text-white shadow-md flex items-center gap-2" style="background-color: ${s.btnColor || datos.colorPrimary}">
            ${renderIcon(s.btnIcon)} <span>${s.btnText || 'Solicitar'}</span>
          </a>
        </div>
      </div>
    </div>
  `).join('\n');

  let horariosHTML = '';
  let linkHorarios = '';
  if (datos.modHorariosActive) {
    linkHorarios = `<a href="#horarios" class="nav-link hover:text-slate-900">Horarios</a>`;

    let contenidoHorario = '';
    if (datos.horariosModo === 'diario') {
      contenidoHorario = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center space-y-1"><span class="font-bold text-xs text-slate-800 block uppercase">Lunes</span><span class="text-xs text-slate-600 font-semibold">${datos.h_lunes}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center space-y-1"><span class="font-bold text-xs text-slate-800 block uppercase">Martes</span><span class="text-xs text-slate-600 font-semibold">${datos.h_martes}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center space-y-1"><span class="font-bold text-xs text-slate-800 block uppercase">Miércoles</span><span class="text-xs text-slate-600 font-semibold">${datos.h_miercoles}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center space-y-1"><span class="font-bold text-xs text-slate-800 block uppercase">Jueves</span><span class="text-xs text-slate-600 font-semibold">${datos.h_jueves}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center space-y-1"><span class="font-bold text-xs text-slate-800 block uppercase">Viernes</span><span class="text-xs text-slate-600 font-semibold">${datos.h_viernes}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center space-y-1"><span class="font-bold text-xs text-slate-800 block uppercase">Sábado</span><span class="text-xs text-slate-600 font-semibold">${datos.h_sabado}</span></div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center col-span-2 space-y-1"><span class="font-bold text-xs text-slate-800 block uppercase">Domingo</span><span class="text-xs text-slate-600 font-semibold">${datos.h_domingo}</span></div>
        </div>
      `;
    } else {
      contenidoHorario = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center space-y-2">
            <i class="fa-solid fa-calendar-days text-3xl mb-2" style="color: ${datos.colorPrimary}"></i>
            <h3 class="font-bold text-slate-800 text-base">Lunes a Viernes</h3>
            <p class="text-slate-600 font-semibold text-sm">${datos.horariosLV}</p>
          </div>
          <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center space-y-2">
            <i class="fa-solid fa-clock text-3xl mb-2" style="color: ${datos.colorPrimary}"></i>
            <h3 class="font-bold text-slate-800 text-base">Sábados y Domingos</h3>
            <p class="text-slate-600 font-semibold text-sm">${datos.horariosSD}</p>
          </div>
        </div>
      `;
    }

    horariosHTML = `
    <section id="horarios" ${getAnimData(datos.animHorarios)} class="bg-white py-20 px-6 md:px-12 my-12 border-t border-slate-100">
      <div class="max-w-5xl my-12 mx-auto text-center space-y-8">
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900">${datos.horariosTitulo || 'Horarios de Atención'}</h2>
        ${contenidoHorario}
      </div>
    </section>`;
  }

  let galeriaHTML = '';
  let linkGaleria = '';
  if (datos.modGaleriaActive && (datos.galeriaList || []).length > 0) {
    linkGaleria = `<a href="#galeria" class="nav-link hover:text-slate-900">Galería</a>`;
    const fotos = datos.galeriaList.map(g => `
      <div class="rounded-2xl overflow-hidden shadow-md h-52 group relative cursor-pointer gallery-item" data-full="${g.url}">
        <img src="${g.url}" alt="Galería" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-3xl">
          <i class="fa-solid fa-magnifying-glass-plus"></i>
        </div>
      </div>
    `).join('\n');

    const subGaleria = datos.galeriaSubtitulo ? `<p class="text-center text-slate-500 text-sm mb-12 max-w-lg mx-auto leading-relaxed">${datos.galeriaSubtitulo}</p>` : '';

    galeriaHTML = `
    <section id="galeria" ${getAnimData(datos.animGaleria)} class="max-w-6xl mx-auto px-6 md:px-12 py-20 my-12">
      <h2 class="text-3xl md:text-4xl font-black text-center text-slate-900 mb-3">${datos.galeriaTitulo || 'Galería de Fotos'}</h2>
      ${subGaleria}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">${fotos}</div>
    </section>`;
  }

  let testimoniosHTML = '';
  if (datos.modTestimoniosActive && (datos.testimoniosList || []).length > 0) {
    const cards = datos.testimoniosList.map(t => `
      <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <div class="flex items-center gap-1 text-amber-400 text-sm">
          <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed italic">"${t.texto}"</p>
        <p class="font-bold text-slate-800 text-sm">— ${t.cliente}</p>
      </div>
    `).join('\n');

    testimoniosHTML = `
    <section ${getAnimData(datos.animTestimonios)} class="bg-slate-100 py-20 px-6 md:px-12 my-12 border-t border-b border-slate-200">
      <div class="max-w-6xl mt-12 mx-auto space-y-12">
        <h2 class="text-3xl md:text-4xl font-black text-center text-slate-900 mb-8">${datos.testimoniosTitulo || 'Opiniones de Clientes'}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">${cards}</div>
      </div>
    </section>`;
  }

  let faqHTML = '';
  if (datos.modFaqActive && (datos.faqList || []).length > 0) {
    const items = datos.faqList.map((f, i) => `
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-2">
        <h3 class="font-bold text-slate-900 text-base md:text-lg flex items-center gap-3">
          <i class="fa-solid fa-circle-question text-emerald-500 text-xl"></i> ${f.pregunta}
        </h3>
        <p class="text-slate-600 text-sm leading-relaxed pl-8">${f.respuesta}</p>
      </div>
    `).join('\n');

    faqHTML = `
    <section class="max-w-4xl mx-auto px-6 md:px-12 py-20 my-3">
      <h2 class="text-3xl md:text-4xl font-black text-center text-slate-900 mb-12">${datos.faqTitulo || 'Preguntas Frecuentes'}</h2>
      <div class="space-y-5">${items}</div>
    </section>`;
  }

  let redesSeccionHTML = '';
  let linkRedes = '';
  if (datos.modRedesActive) {
    const redesButtons = [];
    if (datos.socialFacebook) redesButtons.push(`<a href="${datos.socialFacebook}" target="_blank" class="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-110"><i class="fa-brands fa-facebook-f"></i></a>`);
    if (datos.socialInstagram) redesButtons.push(`<a href="${datos.socialInstagram}" target="_blank" class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-110"><i class="fa-brands fa-instagram"></i></a>`);
    if (datos.socialTiktok) redesButtons.push(`<a href="${datos.socialTiktok}" target="_blank" class="w-14 h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-110"><i class="fa-brands fa-tiktok"></i></a>`);
    if (datos.socialTwitter) redesButtons.push(`<a href="${datos.socialTwitter}" target="_blank" class="w-14 h-14 rounded-2xl bg-slate-800 text-white flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-110"><i class="fa-brands fa-x-twitter"></i></a>`);
    if (datos.socialYoutube) redesButtons.push(`<a href="${datos.socialYoutube}" target="_blank" class="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-110"><i class="fa-brands fa-youtube"></i></a>`);

    if (redesButtons.length > 0) {
      linkRedes = `<a href="#redes" class="nav-link hover:text-slate-900">Redes</a>`;
      const subtituloHTML = datos.redesSubtitulo ? `<p class="text-slate-500 text-sm max-w-md mx-auto leading-relaxed mb-8">${datos.redesSubtitulo}</p>` : '';
      redesSeccionHTML = `
      <section id="redes" ${getAnimData(datos.animRedes)} class="bg-white py-20 px-6 md:px-12 my-16 border-t border-b border-slate-100">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900">${datos.redesTitulo || 'Síguenos en Redes Sociales'}</h2>
          ${subtituloHTML}
          <div class="flex flex-wrap justify-center gap-5 pt-2">
            ${redesButtons.join('')}
          </div>
        </div>
      </section>`;
    }
  }

  const mapEncoded = encodeURIComponent(datos.mapQuery || datos.ubicacion || '');
  const mapIframeUrl = `https://maps.google.com/maps?q=${mapEncoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // Versiones para móviles usando directamente las mismas variables de enlaces de PC (con estilo block)
  const mobileLinkHorarios = linkHorarios ? `<a href="#horarios" class="nav-link block font-bold text-slate-700">Horarios</a>` : '';
  const mobileLinkGaleria = linkGaleria ? `<a href="#galeria" class="nav-link block font-bold text-slate-700">Galería</a>` : '';
  const mobileLinkRedes = linkRedes ? `<a href="#redes" class="nav-link block font-bold text-slate-700">Redes</a>` : '';

  return `<!doctype html>
<html lang="es" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${datos.nombre} | ${datos.categoria}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <style>
      .scroll-anim {
        opacity: 0;
        transition:
          opacity 0.8s ease-out,
          transform 0.8s ease-out;
        will-change: opacity, transform;
      }
      .scroll-anim[data-animate="fade-up"] {
        transform: translateY(30px);
      }
      .scroll-anim[data-animate="zoom-in"] {
        transform: scale(0.92);
      }
      .scroll-anim[data-animate="slide-left"] {
        transform: translateX(-40px);
      }
      .scroll-anim[data-animate="slide-right"] {
        transform: translateX(40px);
      }
      .scroll-anim[data-animate="bounce"] {
        transform: scale(0.85);
      }

      .scroll-anim.animated {
        opacity: 1;
        transform: translateY(0) translateX(0) scale(1) !important;
      }

      .scroll-anim[data-animate="bounce"].animated {
        animation: smoothBounce 0.7s ease-out forwards;
      }

      @keyframes smoothBounce {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        60% {
          opacity: 1;
          transform: scale(1.04);
        }
        85% {
          transform: scale(0.98);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    </style>
  </head>
  <body
    class="bg-slate-50 text-slate-800 antialiased selection:bg-rose-500 selection:text-white px-2 sm:px-4 md:px-8 py-4"
  >
    ${bannerTopHTML}

    <nav
      class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm rounded-2xl"
    >
      <div
        class="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between"
      >
        <a
          href="#inicio"
          class="nav-link text-xl font-black text-slate-900 flex items-center gap-2"
        >
          ${datos.nombre}
        </a>

        <div
          class="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600"
        >
          <a href="#inicio" class="nav-link hover:text-slate-900">Inicio</a>
          <a href="#servicios" class="nav-link hover:text-slate-900"
            >Servicios</a
          >
          ${linkHorarios} ${linkGaleria} ${linkRedes}
          <a href="#contacto" class="nav-link hover:text-slate-900"
            >Ubicación</a
          >
        </div>

        <a
          href="${waUrl}"
          target="_blank"
          class="hidden md:flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg text-xs md:text-sm transition-transform hover:scale-105"
          style="background-color: ${datos.btnNavColor || '#25D366'}"
        >
          <i class="fa-brands fa-whatsapp text-lg"></i> <span>WhatsApp</span>
        </a>

        <button
          id="mobileMenuBtn"
          type="button"
          class="md:hidden text-slate-800 p-2 text-xl"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>

      <div
        id="mobileMenu"
        class="hidden md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-4"
      >
        <a href="#inicio" class="nav-link block font-bold text-slate-700"
          >Inicio</a
        >
        <a href="#servicios" class="nav-link block font-bold text-slate-700"
          >Servicios</a
        >
        ${mobileLinkHorarios}
        ${mobileLinkGaleria}
        ${mobileLinkRedes}
        <a href="#contacto" class="nav-link block font-bold text-slate-700"
          >Ubicación</a
        >
        <div class="pt-2 border-t border-slate-100">
          <a
            href="${waUrl}"
            target="_blank"
            class="flex items-center justify-center gap-2 text-white font-bold px-5 py-3 rounded-xl shadow-md text-sm w-full"
            style="background-color: ${datos.btnNavColor || '#25D366'}"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i> <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>

    <header
      id="inicio"
      ${getAnimData(datos.animHero)}
      class="relative min-h-[580px] flex items-center justify-center px-6 md:px-12 py-24 bg-slate-900 overflow-hidden rounded-3xl my-4"
    >
      <div class="absolute inset-0 z-0">
        <img
          src="${datos.heroBgUrl}"
          alt="Portada"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
      </div>
      <div class="max-w-4xl mx-auto relative z-10 space-y-6 ${alignTextClass}">
        <span
          class="inline-block uppercase tracking-widest text-xs font-extrabold text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full"
          >${datos.categoria}</span
        >
        <h1
          class="text-4xl md:text-6xl font-black leading-tight"
          style="color: ${datos.colorTitle}"
        >
          ${datos.tituloHero}
        </h1>
        <p
          class="text-base md:text-xl text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          ${datos.descripcion}
        </p>
        <div class="pt-6 pb-4 flex flex-wrap gap-4 ${datos.btnAlign}">
          <a
            href="${waUrl}"
            target="_blank"
            class="text-white font-extrabold px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-2 transition-transform hover:scale-105"
            style="background-color: ${datos.btnHero1Color}"
          >
            ${renderIcon(datos.btnHero1Icon)} <span>${datos.btnHero1Text}</span>
          </a>
          <a
            href="#servicios"
            class="nav-link text-white border border-white/30 backdrop-blur-md font-bold px-7 py-4 rounded-2xl flex items-center gap-2 transition-all hover:bg-white/10"
            style="background-color: ${datos.btnHero2Color}"
          >
            <span>${datos.btnHero2Text}</span> ${renderIcon(datos.btnHero2Icon)}
          </a>
        </div>
      </div>
    </header>

    ${statsHTML}

    <section
      id="servicios"
      ${getAnimData(datos.animServicios)}
      class="max-w-6xl mx-auto px-6 md:px-12 py-20 my-6"
    >
      <h2
        class="text-3xl md:text-4xl font-black text-center mt-3 text-slate-900 mb-3"
      >
        ${datos.serviciosTitulo || 'Nuestros Servicios'}
      </h2>
      <p
        class="text-center text-slate-500 text-sm mb-12 max-w-xl mx-auto leading-relaxed"
      >
        ${datos.serviciosSubtitulo || ''}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${tarjetasServicios}
      </div>
    </section>

    ${horariosHTML} ${galeriaHTML} ${testimoniosHTML} ${faqHTML}
    ${redesSeccionHTML}

    <section
      id="contacto"
      class="bg-slate-100 py-20 px-6 md:px-12 my-12 border-t border-slate-200 rounded-3xl"
    >
      <div class="max-w-6xl mx-auto space-y-10">
        <div
          class="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div class="space-y-4">
            <span
              class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200"
              >Contacto</span
            >
            <h3 class="text-2xl md:text-3xl font-extrabold text-slate-900">
              ${datos.nombre}
            </h3>
            <p class="text-sm text-slate-600 font-medium">
              📍 ${datos.ubicacion} | 📞 ${datos.telefono}
            </p>
          </div>
          <a
            href="${waUrl}"
            target="_blank"
            class="text-white font-bold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            style="background-color: ${datos.btnNavColor || '#25D366'}"
            ><i class="fa-brands fa-whatsapp text-lg"></i> Contactar por
            WhatsApp</a
          >
        </div>
        <div
          class="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-96"
        >
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            src="${mapIframeUrl}"
          ></iframe>
        </div>
      </div>
    </section>

    <footer
      class="bg-slate-900 text-slate-400 py-12 px-6 md:px-12 text-center text-xs space-y-3 rounded-2xl my-4"
    >
      <p class="font-semibold text-slate-300">
        &copy; ${new Date().getFullYear()} ${datos.nombre}. Todos los derechos
        reservados.
      </p>
      <p class="text-slate-500">📍 ${datos.ubicacion} | 📞 ${datos.telefono}</p>
    </footer>

    <div
      id="galleryModal"
      class="fixed inset-0 bg-black/90 z-50 hidden items-center justify-center p-4"
    >
      <button
        id="closeModal"
        class="absolute top-6 right-6 text-white text-3xl font-bold cursor-pointer"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <img
        id="modalImg"
        src=""
        class="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
      />
    </div>

    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const elements = document.querySelectorAll(".scroll-anim");
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("animated");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 },
        );

        elements.forEach((el) => observer.observe(el));

        const mobileMenuBtn = document.getElementById("mobileMenuBtn");
        const mobileMenu = document.getElementById("mobileMenu");
        if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
              if (mobileMenu.classList.contains("hidden")) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
              } else {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
              }
            }
          });
        }

        document.addEventListener("click", function (e) {
          const link = e.target.closest(".nav-link");
          if (link) {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
              e.preventDefault();
              if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
                if (mobileMenuBtn) {
                  const icon = mobileMenuBtn.querySelector("i");
                  if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                  }
                }
              }
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }
          }
        });

        const modal = document.getElementById("galleryModal");
        const modalImg = document.getElementById("modalImg");
        const closeModal = document.getElementById("closeModal");

        document.querySelectorAll(".gallery-item").forEach((item) => {
          item.addEventListener("click", function () {
            const fullUrl = this.getAttribute("data-full");
            if (modal && modalImg && fullUrl) {
              modalImg.src = fullUrl;
              modal.classList.remove("hidden");
              modal.classList.add("flex");
            }
          });
        });

        if (closeModal && modal) {
          closeModal.addEventListener("click", function () {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
          });
          modal.addEventListener("click", function (e) {
            if (e.target === modal) {
              modal.classList.add("hidden");
              modal.classList.remove("flex");
            }
          });
        }
      });
    </script>
  </body>
</html>
`;
}