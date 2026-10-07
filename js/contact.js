function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setError(field, message) {
  const wrap = field.closest("label") || field.parentElement;
  const error = wrap.querySelector(".field-error");
  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message || "";
}

function validate(form) {
  let ok = true;
  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const message = form.querySelector("#message");

  if (!name.value.trim()) {
    setError(name, "Please enter your name.");
    ok = false;
  } else setError(name, "");

  if (!email.value.trim()) {
    setError(email, "Please enter your email.");
    ok = false;
  } else if (!isValidEmail(email.value.trim())) {
    setError(email, "Please enter a valid email address.");
    ok = false;
  } else setError(email, "");

  if (message.value.trim().length < 10) {
    setError(message, "Please provide a brief message (at least 10 characters).");
    ok = false;
  } else setError(message, "");

  return ok;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    if (!validate(form)) {
      status.textContent = "Please fix the fields highlighted below.";
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const original = button.textContent;
    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (response.ok) {
        status.textContent = "Message sent. I will reply by email.";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Email me directly instead.";
      }
    } catch {
      status.textContent = "Could not send. Check your connection or email me directly.";
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  });
});
