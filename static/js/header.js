(function() {
    var header = document.querySelector("#siteHeader");
    var lastScrollY = window.scrollY;
    var hideTimer = null;
    var autoHideDelay = 5000;
    var keepVisible = false;

    if (!header) {
        return;
    }

    keepVisible = header.classList.contains("site-header--product");

    function clearHideTimer() {
        if (hideTimer !== null) {
            window.clearTimeout(hideTimer);
            hideTimer = null;
        }
    }

    function scheduleAutoHide() {
        clearHideTimer();

        if (window.scrollY <= 0) {
            return;
        }

        hideTimer = window.setTimeout(function() {
            if (window.scrollY > 0) {
                header.classList.add("site-header--hidden");
            }
        }, autoHideDelay);
    }

    function updateHeader() {
        var currentScrollY = window.scrollY;

        clearHideTimer();

        if (keepVisible) {
            header.classList.add("site-header--solid");
            header.classList.remove("site-header--hidden");
            lastScrollY = currentScrollY;
            return;
        }

        if (currentScrollY <= 0) {
            header.classList.remove("site-header--solid");
            header.classList.remove("site-header--hidden");
            lastScrollY = currentScrollY;
            return;
        }

        header.classList.add("site-header--solid");

        if (currentScrollY > lastScrollY) {
            header.classList.add("site-header--hidden");
        } else if (currentScrollY < lastScrollY) {
            header.classList.remove("site-header--hidden");
            scheduleAutoHide();
        }

        lastScrollY = currentScrollY;
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
})();
