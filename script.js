(() => {
  function initMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const toggle = document.querySelector("[data-menu-toggle]");
    const closeButtons = document.querySelectorAll("[data-menu-close]");

    if (!menu || !toggle) return;

    let lastActive = null;

    function setOpen(nextOpen) {
      if (nextOpen) {
        lastActive = document.activeElement;
        menu.hidden = false;
        document.body.classList.add("menu-open");
        toggle.setAttribute("aria-expanded", "true");
        const firstFocus =
          menu.querySelector("[data-menu-close]") ||
          menu.querySelector("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])");
        if (firstFocus) firstFocus.focus();
      } else {
        menu.hidden = true;
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        if (lastActive && typeof lastActive.focus === "function") lastActive.focus();
        lastActive = null;
      }
    }

    function toggleOpen() {
      setOpen(menu.hidden);
    }

    toggle.addEventListener("click", toggleOpen);

    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => setOpen(false));
    });

    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.matches("[data-menu-overlay]")) setOpen(false);
    });

    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (link) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) setOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileMenu);
  } else {
    initMobileMenu();
  }
})();

