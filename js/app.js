/**
 * Gestor de Estado v6 Studio
 */
document.addEventListener("DOMContentLoaded", () => {
  const previewFrame = document.getElementById("previewFrame");
  const previewWrapper = document.getElementById("previewWrapper");
  const btnExport = document.getElementById("btnExport");
  const heroBgFile = document.getElementById("heroBgFile");
  const heroBgUrl = document.getElementById("heroBgUrl");
  const btnAddService = document.getElementById("btnAddService");
  const servicesContainer = document.getElementById("servicesContainer");

  const tabEditor = document.getElementById("tabEditor");
  const tabPreview = document.getElementById("tabPreview");
  const panelEditor = document.getElementById("panelEditor");
  const panelPreview = document.getElementById("panelPreview");

  if (tabEditor && tabPreview && panelEditor && panelPreview) {
    tabEditor.addEventListener("click", () => {
      tabEditor.classList.add("bg-emerald-500", "text-slate-950");
      tabEditor.classList.remove("text-slate-400");
      tabPreview.classList.remove("bg-emerald-500", "text-slate-950");
      tabPreview.classList.add("text-slate-400");

      panelEditor.classList.remove("hidden");
      panelEditor.classList.add("block");
      panelPreview.classList.add("hidden");
      panelPreview.classList.remove("flex");
    });

    tabPreview.addEventListener("click", () => {
      tabPreview.classList.add("bg-emerald-500", "text-slate-950");
      tabPreview.classList.remove("text-slate-400");
      tabEditor.classList.remove("bg-emerald-500", "text-slate-950");
      tabEditor.classList.add("text-slate-400");

      panelPreview.classList.remove("hidden");
      panelPreview.classList.add("flex");
      panelEditor.classList.add("hidden");
      panelEditor.classList.remove("block");

      actualizarVistaPrevia();
    });
  }

  let serviciosState = [
    {
      titulo: "Pizza Margherita Especial",
      descripcion:
        "Salsa San Marzano, mozzarella fresca, albahaca y aceite de oliva virgen extra.",
      imagen:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
      btnColor: "#e11d48",
      btnText: "Pedir Ahora",
      btnIcon: "fa-solid fa-fire",
    },
    {
      titulo: "Pastas Frescas Importadas",
      descripcion:
        "Fettuccine y raviolis elaborados diariamente con harina italiana.",
      imagen:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
      btnColor: "#059669",
      btnText: "Ver Menú",
      btnIcon: "fa-solid fa-list",
    },
    {
      titulo: "Postres & Tiramisú Classico",
      descripcion:
        "Café espresso, queso mascarpone y cacao de la más alta calidad.",
      imagen:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
      btnColor: "#d97706",
      btnText: "Probar Postre",
      btnIcon: "fa-solid fa-star",
    },
  ];

  function renderServicesInputs() {
    servicesContainer.innerHTML = "";
    serviciosState.forEach((serv, index) => {
      const card = document.createElement("div");
      card.className =
        "bg-slate-900 p-3.5 rounded-xl border border-slate-700/80 space-y-2 relative";
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold text-slate-400 uppercase">Servicio #${index + 1}</span>
          ${serviciosState.length > 1 ? `<button type="button" data-index="${index}" class="btnDeleteService text-rose-400 hover:text-rose-300 text-xs font-bold"><i class="fa-solid fa-trash"></i></button>` : ""}
        </div>
        <input type="text" data-index="${index}" data-field="titulo" value="${serv.titulo}" placeholder="Título" class="service-input w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white">
        <textarea data-index="${index}" data-field="descripcion" rows="2" placeholder="Descripción breve" class="service-input w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white">${serv.descripcion}</textarea>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div class="flex gap-2">
            <input type="color" data-index="${index}" data-field="btnColor" value="${serv.btnColor || "#e11d48"}" class="service-input h-8 w-10 bg-slate-800 border border-slate-700 rounded-lg p-1 cursor-pointer">
            <input type="text" data-index="${index}" data-field="btnText" value="${serv.btnText || "Pedir"}" placeholder="Texto del Botón" class="service-input flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white">
          </div>
          <select data-index="${index}" data-field="btnIcon" class="service-input bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white">
            <option value="fa-solid fa-fire" ${serv.btnIcon === "fa-solid fa-fire" ? "selected" : ""}>Fuego</option>
            <option value="fa-brands fa-whatsapp" ${serv.btnIcon === "fa-brands fa-whatsapp" ? "selected" : ""}>WhatsApp</option>
            <option value="fa-solid fa-star" ${serv.btnIcon === "fa-solid fa-star" ? "selected" : ""}>Estrella</option>
            <option value="fa-solid fa-list" ${serv.btnIcon === "fa-solid fa-list" ? "selected" : ""}>Lista</option>
            <option value="none" ${serv.btnIcon === "none" ? "selected" : ""}>Sin Ícono</option>
          </select>
        </div>

        <div class="flex gap-2">
          <input type="text" data-index="${index}" data-field="imagen" value="${serv.imagen}" placeholder="URL de la imagen" class="service-input flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] text-white">
          <label class="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-1">
            <i class="fa-solid fa-upload"></i>
            <input type="file" accept="image/*" data-index="${index}" class="service-file hidden">
          </label>
        </div>
      `;
      servicesContainer.appendChild(card);
    });

    document.querySelectorAll(".service-file").forEach((fileInput) => {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const index = e.target.getAttribute("data-index");
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

    document.querySelectorAll(".service-input").forEach((input) => {
      input.addEventListener("input", (e) => {
        const index = e.target.getAttribute("data-index");
        const field = e.target.getAttribute("data-field");
        serviciosState[index][field] = e.target.value;
        actualizarVistaPrevia();
      });
    });

    document.querySelectorAll(".btnDeleteService").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-index"));
        serviciosState.splice(idx, 1);
        renderServicesInputs();
        actualizarVistaPrevia();
      });
    });
  }

  function obtenerDatosFormulario() {
    return {
      nombre: document.getElementById("nombre").value,
      categoria: document.getElementById("categoria").value,
      telefono: document.getElementById("telefono").value,
      ubicacion: document.getElementById("ubicacion").value,
      mapQuery: document.getElementById("mapQuery").value,
      btnNavColor: document.getElementById("btnNavColor").value,
      btnNavText: document.getElementById("btnNavText").value,
      btnNavIcon: document.getElementById("btnNavIcon").value,
      tituloHero: document.getElementById("tituloHero").value,
      descripcion: document.getElementById("descripcion").value,
      heroAlign: document.getElementById("heroAlign").value,
      btnAlign: document.getElementById("btnAlign").value,
      btnHero1Color: document.getElementById("btnHero1Color").value,
      btnHero1Text: document.getElementById("btnHero1Text").value,
      btnHero1Icon: document.getElementById("btnHero1Icon").value,
      btnHero2Color: document.getElementById("btnHero2Color").value,
      btnHero2Text: document.getElementById("btnHero2Text").value,
      btnHero2Icon: document.getElementById("btnHero2Icon").value,
      heroBgUrl: heroBgUrl.value,
      colorPrimary: document.getElementById("colorPrimary").value,
      colorTitle: document.getElementById("colorTitle").value,
      animationType: document.getElementById("animationType").value,
      serviciosList: serviciosState,
    };
  }

  function actualizarVistaPrevia() {
    const datos = obtenerDatosFormulario();
    previewFrame.srcdoc = construirHTML(datos);
  }

  heroBgFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        heroBgUrl.value = evt.target.result;
        actualizarVistaPrevia();
      };
      reader.readAsDataURL(file);
    }
  });

  document.querySelectorAll(".btnViewMode").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".btnViewMode").forEach((b) => {
        b.classList.remove("bg-slate-700", "text-white");
        b.classList.add("text-slate-400");
      });

      const mode = e.currentTarget.getAttribute("data-view");
      e.currentTarget.classList.add("bg-slate-700", "text-white");
      e.currentTarget.classList.remove("text-slate-400");

      if (mode === "desktop") {
        previewWrapper.style.maxWidth = "100%";
      } else if (mode === "tablet") {
        previewWrapper.style.maxWidth = "768px";
      } else if (mode === "mobile") {
        previewWrapper.style.maxWidth = "375px";
      }
    });
  });

  btnAddService.addEventListener("click", () => {
    serviciosState.push({
      titulo: "Nuevo Servicio Pro",
      descripcion: "Descripción breve.",
      imagen:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      btnColor: "#10b981",
      btnText: "Consultar",
      btnIcon: "fa-solid fa-star",
    });
    renderServicesInputs();
    actualizarVistaPrevia();
  });

  [
    "nombre",
    "categoria",
    "telefono",
    "ubicacion",
    "mapQuery",
    "btnNavColor",
    "btnNavText",
    "btnNavIcon",
    "tituloHero",
    "descripcion",
    "heroAlign",
    "btnAlign",
    "btnHero1Color",
    "btnHero1Text",
    "btnHero1Icon",
    "btnHero2Color",
    "btnHero2Text",
    "btnHero2Icon",
    "heroBgUrl",
    "colorPrimary",
    "colorTitle",
    "animationType",
  ].forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("input", actualizarVistaPrevia);
    el.addEventListener("change", actualizarVistaPrevia);
  });

  btnExport.addEventListener("click", () => {
    const datos = obtenerDatosFormulario();
    const htmlContenido = construirHTML(datos);

    const blob = new Blob([htmlContenido], {
      type: "text/html;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `index-${datos.nombre.toLowerCase().replace(/[^a-z0-9]/g, "-")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  renderServicesInputs();
  actualizarVistaPrevia();
});
