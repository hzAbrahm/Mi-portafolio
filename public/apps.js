const botonMenu = document.querySelector("#btn-menu");
const menu = document.querySelector("#header2");

botonMenu.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  botonMenu.setAttribute("aria-expanded", abierto);
});

menu.querySelectorAll(".nav-link").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    menu.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
  });
});

const formulario = document.querySelector("#contact-form");
const campos = formulario.querySelectorAll("input, textarea");

formulario.noValidate = true;

function mostrarError(campo) {
  let aviso = campo.parentElement.querySelector(".error");
  if (!aviso) {
    aviso = document.createElement("small");
    aviso.className = "error";
    campo.parentElement.appendChild(aviso);
  }
  aviso.textContent = campo.validity.valid ? "" : campo.validationMessage;
}

campos.forEach((campo) => {
  campo.addEventListener("input", () => mostrarError(campo));
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  campos.forEach(mostrarError);
  if (formulario.checkValidity()) {
    console.log("Formulario válido");
  }
});

const observador = new IntersectionObserver(
  (entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const progreso = entrada.target.querySelector(".progreso");
        progreso.style.width = progreso.dataset.ancho;
        obs.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".barra").forEach((pista) => {
  const progreso = pista.querySelector(".progreso");
  progreso.dataset.ancho = progreso.style.width;
  progreso.style.width = "0";
  observador.observe(pista);
});

document.querySelectorAll(".project").forEach((tarjeta) => {
  tarjeta.addEventListener("click", () => {
    tarjeta.classList.toggle("activo");
  });
});

const botonTema = document.querySelector("#btn-tema");

if (localStorage.getItem("tema") === "claro") {
  document.body.classList.add("tema-claro");
}

botonTema.addEventListener("click", () => {
  const claro = document.body.classList.toggle("tema-claro");
  localStorage.setItem("tema", claro ? "claro" : "oscuro");
});

const modal = document.querySelector("#modal-proyecto");
const modalCategoria = document.querySelector("#modal-categoria");
const modalTitulo = document.querySelector("#modal-titulo");
const modalImagen = document.querySelector("#modal-imagen");
const modalDescripcion = document.querySelector("#modal-descripcion");
const modalTecnologias = document.querySelector("#modal-tecnologias");
const modalEnlace = document.querySelector("#modal-enlace");
const botonCerrar = document.querySelector(".modal-cerrar");

document.querySelectorAll(".project-enlace").forEach((boton) => {
  boton.addEventListener("click", () => {
    const datos = boton.closest(".project").dataset;

    modalCategoria.textContent = datos.categoria;
    modalTitulo.textContent = datos.titulo;
    modalImagen.src = datos.imagen;
    modalImagen.alt = datos.titulo;
    modalDescripcion.textContent = datos.descripcion;
    modalEnlace.href = datos.enlace;

    modalTecnologias.innerHTML = "";
    datos.tecnologias.split(",").forEach((tecnologia) => {
      const item = document.createElement("li");
      item.textContent = tecnologia.trim();
      modalTecnologias.appendChild(item);
    });

    modal.showModal();
  });
});

botonCerrar.addEventListener("click", () => modal.close());

const textos = {
  es: {
    "nav-inicio": "Inicio",
    "nav-acerca": "Acerca de mí",
    "nav-habilidades": "Habilidades",
    "nav-proyectos": "Proyectos",
    "nav-contacto": "Contacto",
    "inicio-saludo": "Hola, yo soy:",
    "inicio-btn": "Contáctame",
    "acerca-titulo": "Acerca de mí",
    "acerca-btn": "¡Trabajemos juntos!",
    "habilidades-titulo": "Habilidades",
    "proyectos-titulo": "Proyectos",
    "ver-detalles": "Ver detalles →",
    "modal-visitar": "Visitar la página",
    "contacto-titulo": "¡Contáctame!",
    "btn-enviar": "Enviar",
    "btn-tema": "Tema",
    "btn-idioma": "Idioma: ES"
  },
  en: {
    "nav-inicio": "Home",
    "nav-acerca": "About me",
    "nav-habilidades": "Skills",
    "nav-proyectos": "Projects",
    "nav-contacto": "Contact",
    "inicio-saludo": "Hi, I'm:",
    "inicio-btn": "Contact me",
    "acerca-titulo": "About me",
    "acerca-btn": "Let's work together!",
    "habilidades-titulo": "Skills",
    "proyectos-titulo": "Projects",
    "ver-detalles": "View details →",
    "modal-visitar": "Visit the site",
    "contacto-titulo": "Contact me!",
    "btn-enviar": "Send",
    "btn-tema": "Theme",
    "btn-idioma": "Language: EN"
  }
};

const botonIdioma = document.querySelector("#btn-idioma");
let idioma = localStorage.getItem("idioma") || "es";

function aplicarIdioma() {
  document.documentElement.lang = idioma;
  document.querySelectorAll("[data-i18n]").forEach((elemento) => {
    const texto = textos[idioma][elemento.dataset.i18n];
    if (texto) {
      elemento.textContent = texto;
    }
  });
}

aplicarIdioma();

botonIdioma.addEventListener("click", () => {
  idioma = idioma === "es" ? "en" : "es";
  localStorage.setItem("idioma", idioma);
  aplicarIdioma();
});