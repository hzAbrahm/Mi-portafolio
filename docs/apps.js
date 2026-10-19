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
    const enProgreso = datos.estado === "progreso";

    modalTitulo.textContent = datos.titulo;
    modalImagen.src = datos.imagen;
    modalImagen.alt = datos.titulo;

    modalCategoria.dataset.i18n = datos.categoriaI18n;
    modalDescripcion.dataset.i18n = datos.descripcionI18n;
    modalEnlace.dataset.i18n = enProgreso ? "modal-progreso" : "modal-visitar";

    if (enProgreso) {
      modalEnlace.removeAttribute("href");
      modalEnlace.setAttribute("aria-disabled", "true");
    } else {
      modalEnlace.href = datos.enlace;
      modalEnlace.removeAttribute("aria-disabled");
    }

    modalTecnologias.innerHTML = "";
    datos.tecnologias.split(",").forEach((tecnologia) => {
      const item = document.createElement("li");
      item.textContent = tecnologia.trim();
      modalTecnologias.appendChild(item);
    });

    aplicarIdioma();
    modal.showModal();
  });
});

botonCerrar.addEventListener("click", () => modal.close());

const textos = {
  es: {
    "btn-menu": "Menú",
    "btn-tema": "Tema",
    "btn-idioma": "Idioma: ES",
    "nav-inicio": "Inicio",
    "nav-acerca": "Acerca de mí",
    "nav-habilidades": "Habilidades",
    "nav-proyectos": "Proyectos",
    "nav-contacto": "Contacto",
    "inicio-saludo": "Hola, yo soy:",
    "inicio-p1": "Programador web y futuro ingeniero mecatrónico. Me gusta aprender nuevas tecnologías y mejorar mis habilidades constantemente.",
    "inicio-p2": "¡Espero poder contribuir en proyectos interesantes!",
    "inicio-btn": "Contáctame",
    "acerca-titulo": "Acerca de mí",
    "acerca-p1": "Soy una persona apasionada por el arte urbano, la robótica y los videojuegos. Me encanta darle ese estilo grafiti a mis proyectos.",
    "acerca-p2": "Me motiva la idea de compartir el arte urbano con el mundo y ayudar a los demás a lograr sus sueños. Con mis proyectos quiero innovar con cosas que puedan ayudar a todo el mundo, sin importar de dónde venga.",
    "acerca-btn": "¡Trabajemos juntos!",
    "habilidades-titulo": "Habilidades",
    "habilidad-diseno": "Diseño responsive",
    "proyectos-titulo": "Proyectos",
    "proyecto-detalles": "Ver detalles →",
    "calles-lema": "Una endulzada con doble alegría",
    "kosmu-lema": "Crea tu estilo",
    "categoria-web": "Página web",
    "calles-desc": "¡Calles Dulces es una repostería que busca generar un impacto social mediante tus compras! Con cada compra, el 10% va a programas de rehabilitación y cursos gratuitos para las nuevas generaciones. ¡Sé parte de este gran y ambicioso proyecto!",
    "kosmu-desc": "Kosmu es un lugar donde podrás encontrar nuevos estilos, ropa urbana y accesorios de otro mundo. ¡Crea tu estilo único con nuestra ropa!",
    "modal-visitar": "Visitar la página",
    "modal-progreso": "En progreso",
    "proximo-texto": "¡Más proyectos muy pronto!",
    "contacto-titulo": "¡Contáctame!",
    "contacto-texto": "¡Estoy emocionado de poder trabajar contigo!",
    "contacto-email": "Email",
    "contacto-telefono": "Teléfono",
    "contacto-ubicacion": "Ubicación",
    "form-nombre": "Nombre completo*:",
    "form-email": "Email*:",
    "form-telefono": "Teléfono*:",
    "form-mensaje": "Resumen del proyecto*:",
    "form-enviar": "Enviar",
    "footer-derechos": "© 2026 HzAbrahmDev. Todos los derechos reservados."
  },
  en: {
    "btn-menu": "Menu",
    "btn-tema": "Theme",
    "btn-idioma": "Language: EN",
    "nav-inicio": "Home",
    "nav-acerca": "About me",
    "nav-habilidades": "Skills",
    "nav-proyectos": "Projects",
    "nav-contacto": "Contact",
    "inicio-saludo": "Hi, I'm:",
    "inicio-p1": "Web developer and future mechatronics engineer. I enjoy learning new technologies and constantly improving my skills.",
    "inicio-p2": "I hope to contribute to interesting projects!",
    "inicio-btn": "Contact me",
    "acerca-titulo": "About me",
    "acerca-p1": "I'm passionate about urban art, robotics and video games. I love giving my projects that graffiti style.",
    "acerca-p2": "I'm motivated by sharing urban art with the world and helping others achieve their dreams. With my projects I want to innovate with things that can help everyone, no matter where they come from.",
    "acerca-btn": "Let's work together!",
    "habilidades-titulo": "Skills",
    "habilidad-diseno": "Responsive design",
    "proyectos-titulo": "Projects",
    "proyecto-detalles": "View details →",
    "calles-lema": "A sweet treat with double joy",
    "kosmu-lema": "Create your style",
    "categoria-web": "Website",
    "calles-desc": "Calles Dulces is a bakery that aims to create social impact through your purchases! With every purchase, 10% goes to rehabilitation programs and free courses for the new generations. Be part of this big, ambitious project!",
    "kosmu-desc": "Kosmu is a place where you can find new styles, streetwear and out-of-this-world accessories. Create your unique style with our clothes!",
    "modal-visitar": "Visit the site",
    "modal-progreso": "In progress",
    "proximo-texto": "More projects coming soon!",
    "contacto-titulo": "Contact me!",
    "contacto-texto": "I'm excited to work with you!",
    "contacto-email": "Email",
    "contacto-telefono": "Phone",
    "contacto-ubicacion": "Location",
    "form-nombre": "Full name*:",
    "form-email": "Email*:",
    "form-telefono": "Phone*:",
    "form-mensaje": "Project summary*:",
    "form-enviar": "Send",
    "footer-derechos": "© 2026 HzAbrahmDev. All rights reserved."
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