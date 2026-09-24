/* =========================================================
   contact.html — form validation
   The form posts to the Formspree endpoint configured in contact.html.
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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.className = "form-status";
    status.textContent = "";

    // Validate the form first
    if (!validateForm(form)) {
      status.textContent = "Please fix the fields highlighted below.";
      status.classList.add("is-visible", "is-error");
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        status.textContent =
          "Message sent successfully! I'll get back to you soon.";

        status.classList.add("is-visible", "is-success");

        form.reset();

        document
          .querySelectorAll(".pill-option.is-checked")
          .forEach((o) => o.classList.remove("is-checked"));

      } else {
        const data = await response.json();

        if (data.errors) {
          status.textContent =
            data.errors.map((error) => error.message).join(", ");
        } else {
          status.textContent =
            "Something went wrong. Please try again.";
        }

        status.classList.add("is-visible", "is-error");
      }

    } catch (error) {
      status.textContent =
        "Unable to send the message. Please check your internet connection.";

      status.classList.add("is-visible", "is-error");

    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializePillGroups();
  initializeContactForm();
});

/* Contact Page Scripts & Auto-Download Trigger */

function initializeAutoDownload() {
  const downloadBtn = document.getElementById("auto-resume-btn");
  if (!downloadBtn) return;

  downloadBtn.addEventListener("click", () => {
    // Show temporary feedback toast/text
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = `✓ Downloading Resume...`;
    downloadBtn.style.opacity = "0.85";

    setTimeout(() => {
      downloadBtn.innerHTML = originalText;
      downloadBtn.style.opacity = "1";
    }, 2500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeAutoDownload();
});
