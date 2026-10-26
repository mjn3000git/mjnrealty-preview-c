/* MJN Realty sample site script. */
// Formspree free plan form ID (the part after formspree.io/f/). Empty = form stays hidden and disabled.
var FORMSPREE_ID = "";
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  var toggle = document.querySelector(".nav-toggle"), nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () { var o = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", o ? "true" : "false"); });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }); });
  }
  var form = document.getElementById("contact-form");
  if (form && FORMSPREE_ID) {
    form.action = "https://formspree.io/f/" + FORMSPREE_ID;
    form.hidden = false; form.querySelector("fieldset").disabled = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var s = document.getElementById("form-status");
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) { s.textContent = r.ok ? "Thanks, your message was sent." : "Sorry, something went wrong. Please call instead."; if (r.ok) form.reset(); s.focus(); })
        .catch(function () { s.textContent = "Sorry, something went wrong. Please call instead."; s.focus(); });
    });
  }
});
