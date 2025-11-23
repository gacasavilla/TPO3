document.addEventListener("DOMContentLoaded", () => {
  // --------------- NAV ---------------
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".navegacion-principal");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => nav.classList.toggle("is-open"));
  }

  // --------------- MODO OSCURO (si existe botón) ---------------
  const toggleModo = document.getElementById("toggle-modo");
  if (toggleModo) {
    const saved = localStorage.getItem("modo-oscuro");
    if (saved === "true") {
      document.body.classList.add("modo-oscuro");
      toggleModo.textContent = "Modo claro";
    } else {
      toggleModo.textContent = "Modo oscuro";
    }

    toggleModo.addEventListener("click", () => {
      const isNowDark = document.body.classList.toggle("modo-oscuro");
      toggleModo.textContent = isNowDark ? "Modo claro" : "Modo oscuro";
      try { localStorage.setItem("modo-oscuro", isNowDark ? "true" : "false"); } catch (e) {}
    });
  }

  // --------------- FORM (si existe) ---------------
  const form = document.getElementById("form-contacto");
  const formMsg = document.getElementById("form-msg");
  if (form && formMsg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = (document.getElementById("nombre") || {}).value || "";
      const email = (document.getElementById("email") || {}).value || "";
      const asunto = (document.getElementById("asunto") || {}).value || "";
      const mensaje = (document.getElementById("mensaje") || {}).value || "";

      if (!nombre.trim() || !email.trim() || !asunto || asunto === "Selecciona un asunto" || !mensaje.trim()) {
        formMsg.textContent = "Por favor ingrese todos los datos";
        formMsg.style.color = "red";
        return;
      }
      formMsg.textContent = "¡Tu mensaje fue enviado!";
      formMsg.style.color = "green";
      form.reset();
    });
  }

  // --------------- CHATBOT ---------------
  const chatBtn = document.getElementById("chatbotBtn");
  const chatWindow = document.getElementById("chatWindow");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendMsgBtn = document.getElementById("sendMsgBtn");
  const chatOptions = document.querySelectorAll(".chat-option");

  // helper: safely append message
  function appendMessage(html, who = "bot") {
    if (!chatMessages) return;
    const el = document.createElement("div");
    el.className = "message " + (who === "bot" ? "msg-bot" : "msg-user");
    el.innerHTML = html;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // show/hide helpers (uses both style and .open class)
  function openChatWindow() {
    if (!chatWindow) return;
    chatWindow.style.display = "flex";
    chatWindow.classList.add("open");
  }
  function closeChatWindow() {
    if (!chatWindow) return;
    chatWindow.style.display = "none";
    chatWindow.classList.remove("open");
  }
  function toggleChatWindow() {
    if (!chatWindow) return;
    const current = getComputedStyle(chatWindow).display;
    if (current === "none") openChatWindow();
    else closeChatWindow();
  }

  if (chatBtn && chatWindow) {
    // ensure initial state is hidden (CSS already hides but reinforce)
    if (getComputedStyle(chatWindow).display === "block") chatWindow.style.display = "none";

    chatBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleChatWindow();
    });

    // clicking inside chat should not close it
    chatWindow.addEventListener("click", (e) => e.stopPropagation());

    // optional: click outside to close
    document.addEventListener("click", () => {
      // si está abierto, cerrarlo (comenta si no querés autocierrre)
      if (chatWindow && getComputedStyle(chatWindow).display !== "none") {
        // closeChatWindow(); // descomentá si querés cerrar al click fuera
      }
    });
  }

  // quick-reply options
  if (chatOptions && chatOptions.length) {
    chatOptions.forEach((opt) => {
      opt.addEventListener("click", () => {
        const optKey = (opt.dataset.opt || opt.textContent || "").toString().trim().toLowerCase();
        appendMessage("📌 " + opt.textContent.trim(), "user");

        // small delay to simulate typing
        setTimeout(() => {
          if (optKey.includes("info") || optKey === "info") {
            appendMessage("Somos Plaza Comercial — Horario: Lun-Dom 10:00–22:00. Dirección: Lima 757, CABA.", "bot");
          } else if (optKey.includes("ofertas") || optKey === "ofertas") {
            appendMessage('Hoy: <strong>20% OFF</strong> en locales seleccionados y <strong>2x1</strong> en gastronomía. <a href="ofertas.html">Ir a Ofertas</a>', "bot");
          } else if (optKey.includes("asistente") || optKey === "asistente") {
            appendMessage("Un asistente humano se comunicará contigo en breve. Dejá tu mensaje o datos de contacto.", "bot");
          } else {
            appendMessage("Gracias por tu consulta. Te responderemos en breve.", "bot");
          }
        }, 200);
      });
    });
  }

  // send message from input
  if (sendMsgBtn && chatInput) {
    sendMsgBtn.addEventListener("click", () => {
      const txt = chatInput.value.trim();
      if (!txt) return;
      appendMessage(txt, "user");
      chatInput.value = "";
      setTimeout(() => appendMessage("Gracias. En breve te contestamos.", "bot"), 600);
    });

    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMsgBtn.click();
      }
    });
  }

});
