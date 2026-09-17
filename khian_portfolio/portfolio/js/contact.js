/* =========================================================
   contact.html — form validation
   NOTE: This form does not send email on its own — there is
   no backend wired up. Hook it up to Formspree, EmailJS, or a
   custom backend endpoint (see README) before relying on it.
   ========================================================= */

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setFieldError(field, message) {
  const wrapper = field.closest(".field");
  const errorEl = wrapper.querySelector(".field-error");
  wrapper.classList.toggle("has-error", Boolean(message));
  if (errorEl) errorEl.textContent = message || "";
}

function validateForm(form) {
  let valid = true;

  const name = form.querySelector("#name");
  if (!name.value.trim()) {
    setFieldError(name, "Please enter your name.");
    valid = false;
  } else {
    setFieldError(name, "");
  }

  const email = form.querySelector("#email");
  if (!email.value.trim()) {
    setFieldError(email, "Please enter your email.");
    valid = false;
  } else if (!isValidEmail(email.value.trim())) {
    setFieldError(email, "Please enter a valid email address.");
    valid = false;
  } else {
    setFieldError(email, "");
  }

  const message = form.querySelector("#message");
  if (message.value.trim().length < 20) {
    setFieldError(message, "Please add a little more detail (at least 20 characters).");
    valid = false;
  } else {
    setFieldError(message, "");
  }

  return valid;
}

function initializePillGroups() {
  document.querySelectorAll(".pill-group").forEach((group) => {
    group.addEventListener("click", (e) => {
      const option = e.target.closest(".pill-option");
      if (!option) return;
      const input = option.querySelector("input");
      const isRadio = input.type === "radio";

      if (isRadio) {
        group.querySelectorAll(".pill-option").forEach((o) => o.classList.remove("is-checked"));
        input.checked = true;
        option.classList.add("is-checked");
      } else {
        input.checked = !input.checked;
        option.classList.toggle("is-checked", input.checked);
      }
    });
  });
}

function initializeContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.className = "form-status";

    if (!validateForm(form)) {
      status.textContent = "Please fix the fields highlighted below.";
      status.classList.add("is-visible", "is-error");
      return;
    }

    // No backend is connected yet — this only confirms the form is valid.
    // Wire this up to Formspree, EmailJS, or your own API endpoint to actually send it.
    status.textContent = "Thanks — this form isn't connected to a backend yet, but your message looks good to send once it is.";
    status.classList.add("is-visible", "is-success");
    form.reset();
    document.querySelectorAll(".pill-option.is-checked").forEach((o) => o.classList.remove("is-checked"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializePillGroups();
  initializeContactForm();
});
