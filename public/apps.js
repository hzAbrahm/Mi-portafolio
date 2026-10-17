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

