const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('.navegacion-principal');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");
  const msg = document.getElementById("form-msg");

  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    if (
      nombre === "" ||
      email === "" ||
      asunto === "" ||
      asunto === "Selecciona un asunto" ||
      mensaje === ""
    ) {
      msg.textContent = "Por favor ingrese todos los datos";
      msg.style.color = "red";
      return;
    }

    msg.textContent = "¡Tu mensaje fue enviado!";
    msg.style.color = "green";
    form.reset();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-modo");
  if (!toggleBtn) {
    console.error("Modo oscuro: botón #toggle-modo no encontrado");
    return;
  }

  function applySavedMode() {
    const saved = localStorage.getItem("modo-oscuro");
    if (saved === "on") {
      document.body.classList.add("modo-oscuro");
      toggleBtn.textContent = "Modo claro";
    } else {
      document.body.classList.remove("modo-oscuro");
      toggleBtn.textContent = "Modo oscuro";
    }
  }

  applySavedMode();

  toggleBtn.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("modo-oscuro");
    toggleBtn.textContent = isDark ? "Modo claro" : "Modo oscuro";
    try {
      localStorage.setItem("modo-oscuro", isDark ? "on" : "off");
    } catch (e) {
      console.warn("No se pudo guardar la preferencia en localStorage", e);
    }
  });
});
