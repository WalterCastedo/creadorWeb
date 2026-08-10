document.addEventListener('DOMContentLoaded', () => {
  const previewFrame = document.getElementById('previewFrame');
  const previewWrapper = document.getElementById('previewWrapper');
  const btnExport = document.getElementById('btnExport');
  const heroBgFile = document.getElementById('heroBgFile');
  const heroBgUrl = document.getElementById('heroBgUrl');
  const btnAddService = document.getElementById('btnAddService');
  const servicesContainer = document.getElementById('servicesContainer');

  const tabEditor = document.getElementById('tabEditor');
  const tabPreview = document.getElementById('tabPreview');
  const panelEditor = document.getElementById('panelEditor');
  const panelPreview = document.getElementById('panelPreview');

  const horariosModo = document.getElementById('horariosModo');
  const horariosRangosBox = document.getElementById('horariosRangosBox');
  const horariosDiarioBox = document.getElementById('horariosDiarioBox');

  if (horariosModo && horariosRangosBox && horariosDiarioBox) {
    horariosModo.addEventListener('change', (e) => {
      if (e.target.value === 'diario') {
        horariosRangosBox.classList.add('hidden');
        horariosDiarioBox.classList.remove('hidden');
      } else {
        horariosRangosBox.classList.remove('hidden');
        horariosDiarioBox.classList.add('hidden');
      }
      actualizarVistaPrevia();
    });
  }

  if (tabEditor && tabPreview && panelEditor && panelPreview) {
    tabEditor.addEventListener('click', () => {
      tabEditor.classList.add('bg-emerald-500', 'text-slate-950');
      tabEditor.classList.remove('text-slate-400');
      tabPreview.classList.remove('bg-emerald-500', 'text-slate-950');
      tabPreview.classList.add('text-slate-400');
      
      panelEditor.classList.remove('hidden');
      panelEditor.classList.add('block');
      panelPreview.classList.add('hidden');
      panelPreview.classList.remove('flex');
    });

    tabPreview.addEventListener('click', () => {
      tabPreview.classList.add('bg-emerald-500', 'text-slate-950');
      tabPreview.classList.remove('text-slate-400');
      tabEditor.classList.remove('bg-emerald-500', 'text-slate-950');
      tabEditor.classList.add('text-slate-400');
      
      panelPreview.classList.remove('hidden');
      panelPreview.classList.add('flex');
      panelEditor.classList.add('hidden');
      panelEditor.classList.remove('block');

      actualizarVistaPrevia();
    });
  }

  let statsState = [
    { numero: '+10 Años', etiqueta: 'De Experiencia', icon: 'fa-solid fa-award' },
    { numero: '100%', etiqueta: 'Masa Madre', icon: 'fa-solid fa-wheat-awn' },
    { numero: '4.9 ★', etiqueta: 'Calificación', icon: 'fa-solid fa-star' },
    { numero: 'Envío Gratis', etiqueta: 'Zonas Cercanas', icon: 'fa-solid fa-motorcycle' }
  ];

  let serviciosState = [
    {
      titulo: 'Pizza Margherita Especial',
      descripcion: 'Salsa San Marzano, mozzarella fresca, albahaca y aceite de oliva virgen extra.',
      imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
      btnColor: '#e11d48',
      btnText: 'Pedir Ahora',
      btnIcon: 'fa-solid fa-fire'
    },
    {
      titulo: 'Pastas Frescas Importadas',
      descripcion: 'Fettuccine y raviolis elaborados diariamente con harina italiana.',
      imagen: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
      btnColor: '#059669',
      btnText: 'Ver Menú',
      btnIcon: 'fa-solid fa-list'
    }
  ];

  let galeriaState = [
    { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
    { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80' }
  ];

  let testimoniosState = [
    { cliente: 'Carlos M.', texto: 'Las mejores pizzas napolitanas de la ciudad, atención de 10 estrellas.' },
    { cliente: 'Sofía R.', texto: 'El ambiente es espectacular y los postres artesanales imperdibles.' }
  ];

  let faqState = [
    { pregunta: '¿Hacen envíos a domicilio?', respuesta: 'Sí, contamos con servicio de delivery en toda la zona central.' },
    { pregunta: '¿Tienen opciones vegetarianas?', respuesta: 'Por supuesto, varias de nuestras especialidades son 100% vegetarianas.' }
  ];

  function renderStatsInputs() {
    const container = document.getElementById('statsContainer');
    if (!container) return;
    container.innerHTML = '';
    statsState.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-2 relative';
      div.innerHTML = `
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-bold text-slate-400">Caja #${idx + 1}</span>
          <button type="button" data-idx="${idx}" class="btnDelStat text-rose-400 text-xs"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="grid grid-cols-2 gap-1.5">
          <input type="text" data-idx="${idx}" data-field="numero" value="${item.numero}" placeholder="Dato (+10, 100%)" class="stat-input bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white">
          <input type="text" data-idx="${idx}" data-field="etiqueta" value="${item.etiqueta}" placeholder="Etiqueta" class="stat-input bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white">
        </div>
        <div>
          <label class="block text-[9px] font-semibold text-slate-400 mb-0.5">Ícono del Beneficio</label>
          <select data-idx="${idx}" data-field="icon" class="stat-input w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white">
            <option value="fa-solid fa-award" ${item.icon === 'fa-solid fa-award' ? 'selected' : ''}>Premio / Medalla</option>
            <option value="fa-solid fa-wheat-awn" ${item.icon === 'fa-solid fa-wheat-awn' ? 'selected' : ''}>Trigo / Artesanal</option>
            <option value="fa-solid fa-star" ${item.icon === 'fa-solid fa-star' ? 'selected' : ''}>Estrella / Calificación</option>
            <option value="fa-solid fa-motorcycle" ${item.icon === 'fa-solid fa-motorcycle' ? 'selected' : ''}>Delivery / Moto</option>
            <option value="fa-solid fa-shield-halved" ${item.icon === 'fa-solid fa-shield-halved' ? 'selected' : ''}>Garantía / Escudo</option>
            <option value="fa-solid fa-clock" ${item.icon === 'fa-solid fa-clock' ? 'selected' : ''}>Reloj / Rapidez</option>
            <option value="fa-solid fa-heart" ${item.icon === 'fa-solid fa-heart' ? 'selected' : ''}>Corazón / Pasión</option>
            <option value="fa-solid fa-users" ${item.icon === 'fa-solid fa-users' ? 'selected' : ''}>Clientes / Grupo</option>
            <option value="none" ${item.icon === 'none' ? 'selected' : ''}>Sin Ícono</option>
          </select>
        </div>
      `;
      container.appendChild(div);
    });

    document.querySelectorAll('.stat-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.getAttribute('data-idx');
        const f = e.target.getAttribute('data-field');
        statsState[i][f] = e.target.value;
        actualizarVistaPrevia();
      });
      inp.addEventListener('change', (e) => {
        const i = e.target.getAttribute('data-idx');
        const f = e.target.getAttribute('data-field');
        statsState[i][f] = e.target.value;
        actualizarVistaPrevia();
      });
    });

    document.querySelectorAll('.btnDelStat').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.currentTarget.getAttribute('data-idx'));
        statsState.splice(i, 1);
        renderStatsInputs();
        actualizarVistaPrevia();
      });
    });
  }

  function renderGaleriaInputs() {
    const container = document.getElementById('galeriaContainer');
    if (!container) return;
    container.innerHTML = '';
    galeriaState.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'flex gap-2 items-center';
      div.innerHTML = `
        <input type="text" data-idx="${idx}" value="${item.url}" class="galeria-input flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white">
        <button type="button" data-idx="${idx}" class="btnDelGaleria text-rose-400 hover:text-rose-300 text-xs font-bold px-1.5"><i class="fa-solid fa-trash"></i></button>
      `;
      container.appendChild(div);
    });

    document.querySelectorAll('.galeria-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.getAttribute('data-idx');
        galeriaState[i].url = e.target.value;
        actualizarVistaPrevia();
      });
    });

    document.querySelectorAll('.btnDelGaleria').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.currentTarget.getAttribute('data-idx'));
        galeriaState.splice(i, 1);
        renderGaleriaInputs();
        actualizarVistaPrevia();
      });
    });
  }

  function renderTestimoniosInputs() {
    const container = document.getElementById('testimoniosContainer');
    if (!container) return;
    container.innerHTML = '';
    testimoniosState.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1.5 relative';
      div.innerHTML = `
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-bold text-slate-400">Cliente #${idx + 1}</span>
          <button type="button" data-idx="${idx}" class="btnDelTestimonio text-rose-400 text-xs"><i class="fa-solid fa-trash"></i></button>
        </div>
        <input type="text" data-idx="${idx}" data-field="cliente" value="${item.cliente}" placeholder="Nombre del Cliente" class="testimonio-input w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white">
        <textarea data-idx="${idx}" data-field="texto" rows="1" placeholder="Opinión" class="testimonio-input w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white">${item.texto}</textarea>
      `;
      container.appendChild(div);
    });

    document.querySelectorAll('.testimonio-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.getAttribute('data-idx');
        const f = e.target.getAttribute('data-field');
        testimoniosState[i][f] = e.target.value;
        actualizarVistaPrevia();
      });
    });

    document.querySelectorAll('.btnDelTestimonio').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.currentTarget.getAttribute('data-idx'));
        testimoniosState.splice(i, 1);
        renderTestimoniosInputs();
        actualizarVistaPrevia();
      });
    });
  }

  function renderFaqInputs() {
    const container = document.getElementById('faqContainer');
    if (!container) return;
    container.innerHTML = '';
    faqState.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1.5 relative';
      div.innerHTML = `
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-bold text-slate-400">Pregunta #${idx + 1}</span>
          <button type="button" data-idx="${idx}" class="btnDelFaq text-rose-400 text-xs"><i class="fa-solid fa-trash"></i></button>
        </div>
        <input type="text" data-idx="${idx}" data-field="pregunta" value="${item.pregunta}" placeholder="Pregunta" class="faq-input w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white">
        <textarea data-idx="${idx}" data-field="respuesta" rows="1" placeholder="Respuesta" class="faq-input w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white">${item.respuesta}</textarea>
      `;
      container.appendChild(div);
    });

    document.querySelectorAll('.faq-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.getAttribute('data-idx');
        const f = e.target.getAttribute('data-field');
        faqState[i][f] = e.target.value;
        actualizarVistaPrevia();
      });
    });

    document.querySelectorAll('.btnDelFaq').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.currentTarget.getAttribute('data-idx'));
        faqState.splice(i, 1);
        renderFaqInputs();
        actualizarVistaPrevia();
      });
    });
  }

  function renderServicesInputs() {
    if (!servicesContainer) return;
    servicesContainer.innerHTML = '';
    serviciosState.forEach((serv, index) => {
      const card = document.createElement('div');
      card.className = 'bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 relative';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold text-slate-400 uppercase">Servicio #${index + 1}</span>
          ${serviciosState.length > 1 ? `<button type="button" data-index="${index}" class="btnDeleteService text-rose-400 hover:text-rose-300 text-xs font-bold"><i class="fa-solid fa-trash"></i></button>` : ''}
        </div>
        <input type="text" data-index="${index}" data-field="titulo" value="${serv.titulo}" placeholder="Título" class="service-input w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white">
        <textarea data-index="${index}" data-field="descripcion" rows="2" placeholder="Descripción breve" class="service-input w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white">${serv.descripcion}</textarea>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div class="flex gap-2">
            <input type="color" data-index="${index}" data-field="btnColor" value="${serv.btnColor || '#e11d48'}" class="service-input h-8 w-10 bg-slate-900 border border-slate-800 rounded-lg p-1 cursor-pointer">
            <input type="text" data-index="${index}" data-field="btnText" value="${serv.btnText || 'Pedir'}" placeholder="Texto del Botón" class="service-input flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white">
          </div>
          <select data-index="${index}" data-field="btnIcon" class="service-input bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white">
            <option value="fa-solid fa-fire" ${serv.btnIcon === 'fa-solid fa-fire' ? 'selected' : ''}>Fuego</option>
            <option value="fa-brands fa-whatsapp" ${serv.btnIcon === 'fa-brands fa-whatsapp' ? 'selected' : ''}>WhatsApp</option>
            <option value="fa-solid fa-star" ${serv.btnIcon === 'fa-solid fa-star' ? 'selected' : ''}>Estrella</option>
            <option value="fa-solid fa-list" ${serv.btnIcon === 'fa-solid fa-list' ? 'selected' : ''}>Lista</option>
            <option value="none" ${serv.btnIcon === 'none' ? 'selected' : ''}>Sin Ícono</option>
          </select>
        </div>

        <div class="flex gap-2">
          <input type="text" data-index="${index}" data-field="imagen" value="${serv.imagen}" placeholder="URL de la imagen" class="service-input flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] text-white">
          <label class="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-1 border border-slate-700">
            <i class="fa-solid fa-upload"></i>
            <input type="file" accept="image/*" data-index="${index}" class="service-file hidden">
          </label>
        </div>
      `;
      servicesContainer.appendChild(card);
    });

    document.querySelectorAll('.service-file').forEach(fileInput => {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const index = e.target.getAttribute('data-index');
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            serviciosState[index].imagen = evt.target.result;
            renderServicesInputs();
            actualizarVistaPrevia();
          };
          reader.readAsDataURL(file);
        }
      });
    });

    document.querySelectorAll('.service-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const index = e.target.getAttribute('data-index');
        const field = e.target.getAttribute('data-field');
        serviciosState[index][field] = e.target.value;
        actualizarVistaPrevia();
      });
    });

    document.querySelectorAll('.btnDeleteService').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        serviciosState.splice(idx, 1);
        renderServicesInputs();
        actualizarVistaPrevia();
      });
    });
  }

  function obtenerDatosFormulario() {
    const getVal = (id, def = '') => {
      const el = document.getElementById(id);
      return el ? el.value : def;
    };
    const getCheck = (id) => {
      const el = document.getElementById(id);
      return el ? el.checked : false;
    };

    return {
      nombre: getVal('nombre', 'Napoletana Gourmet'),
      categoria: getVal('categoria', 'Pizzería Artesanal'),
      telefono: getVal('telefono', '+591 70000000'),
      ubicacion: getVal('ubicacion', 'Av. Monseñor Rivero #450, Santa Cruz, Bolivia'),
      mapQuery: getVal('mapQuery', 'Santa Cruz de la Sierra, Bolivia'),
      btnNavColor: getVal('btnNavColor', '#25D366'),
      animHero: getVal('animHero', 'fade-up'),
      animServicios: getVal('animServicios', 'zoom-in'),
      animHorarios: getVal('animHorarios', 'slide-left'),
      animGaleria: getVal('animGaleria', 'zoom-in'),
      animTestimonios: getVal('animTestimonios', 'fade-up'),
      animRedes: getVal('animRedes', 'bounce'),
      modBannerActive: getCheck('modBannerActive'),
      bannerTexto: getVal('bannerTexto'),
      bannerBgColor: getVal('bannerBgColor', '#e11d48'),
      bannerTextColor: getVal('bannerTextColor', '#ffffff'),
      modStatsActive: getCheck('modStatsActive'),
      statsList: statsState,
      serviciosTitulo: getVal('serviciosTitulo', 'Nuestros Servicios Destacados'),
      serviciosSubtitulo: getVal('serviciosSubtitulo', 'Variedad y sabor en cada preparación.'),
      modRedesActive: getCheck('modRedesActive'),
      redesTitulo: getVal('redesTitulo', 'Síguenos en Redes Sociales'),
      redesSubtitulo: getVal('redesSubtitulo', 'Conéctate con nosotros para ofertas exclusivas.'),
      socialFacebook: getVal('socialFacebook'),
      socialInstagram: getVal('socialInstagram'),
      socialTiktok: getVal('socialTiktok'),
      socialTwitter: getVal('socialTwitter'),
      socialYoutube: getVal('socialYoutube'),
      tituloHero: getVal('tituloHero', 'La Auténtica Pizza Napolitana'),
      descripcion: getVal('descripcion', 'Masa madre madurada 48 horas.'),
      heroAlign: getVal('heroAlign', 'center'),
      btnAlign: getVal('btnAlign', 'justify-center'),
      btnHero1Color: getVal('btnHero1Color', '#e11d48'),
      btnHero1Text: getVal('btnHero1Text', 'Ordenar Ahora'),
      btnHero1Icon: getVal('btnHero1Icon', 'fa-solid fa-fire'),
      btnHero2Color: getVal('btnHero2Color', '#334155'),
      btnHero2Text: getVal('btnHero2Text', 'Ver Servicios'),
      btnHero2Icon: getVal('btnHero2Icon', 'fa-solid fa-chevron-down'),
      heroBgUrl: heroBgUrl ? heroBgUrl.value : 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
      colorPrimary: getVal('colorPrimary', '#e11d48'),
      colorTitle: getVal('colorTitle', '#ffffff'),
      animationType: getVal('animationType', 'zoom'),
      modHorariosActive: getCheck('modHorariosActive'),
      horariosModo: getVal('horariosModo', 'rangos'),
      horariosTitulo: getVal('horariosTitulo', 'Horarios de Atención'),
      horariosLV: getVal('horariosLV', '11:30 AM - 23:00 PM'),
      horariosSD: getVal('horariosSD', '12:00 PM - 00:00 AM'),
      h_lunes: getVal('h_lunes', '11:30 AM - 22:00 PM'),
      h_martes: getVal('h_martes', '11:30 AM - 22:00 PM'),
      h_miercoles: getVal('h_miercoles', '11:30 AM - 22:00 PM'),
      h_jueves: getVal('h_jueves', '11:30 AM - 23:00 PM'),
      h_viernes: getVal('h_viernes', '11:30 AM - 00:00 AM'),
      h_sabado: getVal('h_sabado', '12:00 PM - 00:00 AM'),
      h_domingo: getVal('h_domingo', 'Cerrado'),
      modGaleriaActive: getCheck('modGaleriaActive'),
      galeriaTitulo: getVal('galeriaTitulo', 'Galería de Fotos'),
      galeriaSubtitulo: getVal('galeriaSubtitulo', 'Haz clic para ampliar'),
      galeriaList: galeriaState,
      modTestimoniosActive: getCheck('modTestimoniosActive'),
      testimoniosTitulo: getVal('testimoniosTitulo', 'Opiniones de Clientes'),
      testimoniosList: testimoniosState,
      modFaqActive: getCheck('modFaqActive'),
      faqTitulo: getVal('faqTitulo', 'Preguntas Frecuentes'),
      faqList: faqState,
      serviciosList: serviciosState
    };
  }

  function actualizarVistaPrevia() {
    if (!previewFrame) return;
    const datos = obtenerDatosFormulario();
    previewFrame.srcdoc = construirHTML(datos);
  }

  document.getElementById('btnAddStat')?.addEventListener('click', () => {
    statsState.push({ numero: '100%', etiqueta: 'Calidad', icon: 'fa-solid fa-star' });
    renderStatsInputs();
    actualizarVistaPrevia();
  });

  document.getElementById('btnAddGaleriaImg')?.addEventListener('click', () => {
    galeriaState.push({ url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80' });
    renderGaleriaInputs();
    actualizarVistaPrevia();
  });

  document.getElementById('btnAddTestimonio')?.addEventListener('click', () => {
    testimoniosState.push({ cliente: 'Nuevo Cliente', texto: 'Excelente servicio y calidad.' });
    renderTestimoniosInputs();
    actualizarVistaPrevia();
  });

  document.getElementById('btnAddFaq')?.addEventListener('click', () => {
    faqState.push({ pregunta: '¿Nueva pregunta?', respuesta: 'Respuesta detallada.' });
    renderFaqInputs();
    actualizarVistaPrevia();
  });

  if (heroBgFile) {
    heroBgFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (heroBgUrl) heroBgUrl.value = evt.target.result;
          actualizarVistaPrevia();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  document.querySelectorAll('.btnViewMode').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btnViewMode').forEach(b => {
        b.classList.remove('bg-slate-800', 'text-white');
        b.classList.add('text-slate-400');
      });

      const mode = e.currentTarget.getAttribute('data-view');
      e.currentTarget.classList.add('bg-slate-800', 'text-white');
      e.currentTarget.classList.remove('text-slate-400');

      if (previewWrapper) {
        if (mode === 'desktop') previewWrapper.style.maxWidth = '100%';
        else if (mode === 'tablet') previewWrapper.style.maxWidth = '768px';
        else if (mode === 'mobile') previewWrapper.style.maxWidth = '375px';
      }
    });
  });

  if (btnAddService) {
    btnAddService.addEventListener('click', () => {
      serviciosState.push({
        titulo: 'Nuevo Servicio Pro',
        descripcion: 'Descripción breve.',
        imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        btnColor: '#10b981',
        btnText: 'Consultar',
        btnIcon: 'fa-solid fa-star'
      });
      renderServicesInputs();
      actualizarVistaPrevia();
    });
  }

  ['nombre', 'categoria', 'telefono', 'ubicacion', 'mapQuery', 'btnNavColor', 'animHero', 'animServicios', 'animHorarios', 'animGaleria', 'animTestimonios', 'animRedes', 'modBannerActive', 'bannerTexto', 'bannerBgColor', 'bannerTextColor', 'modStatsActive', 'serviciosTitulo', 'serviciosSubtitulo', 'modRedesActive', 'redesTitulo', 'redesSubtitulo', 'socialFacebook', 'socialInstagram', 'socialTiktok', 'socialTwitter', 'socialYoutube', 'tituloHero', 'descripcion', 'heroAlign', 'btnAlign', 'btnHero1Color', 'btnHero1Text', 'btnHero1Icon', 'btnHero2Color', 'btnHero2Text', 'btnHero2Icon', 'heroBgUrl', 'colorPrimary', 'colorTitle', 'animationType', 'modHorariosActive', 'horariosModo', 'horariosTitulo', 'horariosLV', 'horariosSD', 'h_lunes', 'h_martes', 'h_miercoles', 'h_jueves', 'h_viernes', 'h_sabado', 'h_domingo', 'modGaleriaActive', 'galeriaTitulo', 'galeriaSubtitulo', 'modTestimoniosActive', 'testimoniosTitulo', 'modFaqActive', 'faqTitulo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', actualizarVistaPrevia);
      el.addEventListener('change', actualizarVistaPrevia);
    }
  });

  renderStatsInputs();
  renderGaleriaInputs();
  renderTestimoniosInputs();
  renderFaqInputs();
  renderServicesInputs();
  
  setTimeout(actualizarVistaPrevia, 100);
});