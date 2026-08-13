(function() {
    var header = document.querySelector("#siteHeader");
    var productMenuTrigger = document.querySelector("#productMenuTrigger");
    var productMenu = document.querySelector("#productMenu");
    var lastScrollY = window.scrollY;
    var hideTimer = null;
    var productMenuTimer = null;
    var autoHideDelay = 5000;

    if (!header) {
        return;
    }

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

    function updateProductMenuPosition() {
        var triggerRect;
        var menuWidth;
        var minLeft;
        var maxLeft;
        var triggerCenter;
        var menuLeft;

        if (!productMenuTrigger || !productMenu) {
            return;
        }

        triggerRect = productMenuTrigger.getBoundingClientRect();
        menuWidth = Math.min(720, window.innerWidth - 48);
        minLeft = 24 + menuWidth / 2;
        maxLeft = window.innerWidth - 24 - menuWidth / 2;
        triggerCenter = triggerRect.left + triggerRect.width / 2;
        menuLeft = Math.min(Math.max(triggerCenter, minLeft), maxLeft);

        productMenu.style.setProperty("--product-menu-left", menuLeft + "px");
    }

    function openProductMenu() {
        if (!productMenuTrigger || !productMenu) {
            return;
        }

        window.clearTimeout(productMenuTimer);
        productMenuTimer = null;
        updateProductMenuPosition();
        productMenuTrigger.classList.add("is-active");
        productMenu.classList.add("is-open");
        header.classList.remove("site-header--hidden");
    }

    function closeProductMenu() {
        if (!productMenuTrigger || !productMenu) {
            return;
        }

        window.clearTimeout(productMenuTimer);
        productMenuTimer = window.setTimeout(function() {
            productMenuTrigger.classList.remove("is-active");
            productMenu.classList.remove("is-open");
        }, 120);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateProductMenuPosition);

    if (productMenuTrigger && productMenu) {
        productMenuTrigger.addEventListener("mouseenter", openProductMenu);
        productMenuTrigger.addEventListener("focus", openProductMenu);

        productMenuTrigger.addEventListener("mouseleave", closeProductMenu);
        productMenu.addEventListener("mouseenter", openProductMenu);
        productMenu.addEventListener("mouseleave", closeProductMenu);
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                productMenuTrigger.classList.remove("is-active");
                productMenu.classList.remove("is-open");
            }
        });
    }
})();
