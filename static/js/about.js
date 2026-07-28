(function() {
    var reveals = Array.prototype.slice.call(
        document.querySelectorAll(".about-reveal")
    );
    var snapSections = Array.prototype.slice.call(
        document.querySelectorAll(".about-section--snap")
    );
    var releaseSection = document.querySelector(".site-footer");
    var header = document.querySelector("#siteHeader");
    var desktopMedia = window.matchMedia("(min-width: 621px)");
    var reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    var snapTargets = [];
    var wheelDistance = 0;
    var wheelResetTimer = null;
    var lastWheelDirection = 0;
    var settleFrame = null;
    var settleTimer = null;
    var isLocked = false;
    var wheelThreshold = 44;
    var lockReleaseTolerance = 6;

    function revealAll(
        ) {
        reveals.forEach(function(element) {
            element.classList.add("is-visible");
        });
    }

    function bindRevealObserver(
        ) {
        var observer = null;

        if (reveals.length === 0) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            revealAll();
            return;
        }

        observer = new IntersectionObserver(
            function(entries) {
                entries.forEach(function(entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        reveals.forEach(function(element) {
            observer.observe(element);
        });
    }

    bindRevealObserver();

    if (snapSections.length === 0 || !releaseSection) {
        return;
    }

    function isEnabled(
        ) {
        return desktopMedia.matches && !reducedMotionMedia.matches;
    }

    function keepHeaderVisible(
        ) {
        if (header) {
            header.classList.remove("site-header--hidden");
            header.classList.add("site-header--solid");
        }
    }

    function clearWheelDistance(
        ) {
        if (wheelResetTimer !== null) {
            window.clearTimeout(wheelResetTimer);
            wheelResetTimer = null;
        }

        wheelDistance = 0;
        lastWheelDirection = 0;
    }

    function scheduleWheelReset(
        ) {
        if (wheelResetTimer !== null) {
            window.clearTimeout(wheelResetTimer);
        }

        wheelResetTimer = window.setTimeout(clearWheelDistance, 260);
    }

    function clearLock(
        ) {
        if (settleFrame !== null) {
            window.cancelAnimationFrame(settleFrame);
            settleFrame = null;
        }

        if (settleTimer !== null) {
            window.clearTimeout(settleTimer);
            settleTimer = null;
        }

        isLocked = false;
    }

    function refreshTargets(
        ) {
        snapTargets = snapSections.map(function(section) {
            return {
                id: section.id,
                top: Math.round(section.getBoundingClientRect().top + window.scrollY)
            };
        });

        snapTargets.push({
            id: releaseSection.id,
            top: Math.round(releaseSection.getBoundingClientRect().top + window.scrollY)
        });

        updateActiveSection(window.scrollY);
    }

    function getReleaseTop(
        ) {
        return snapTargets[snapTargets.length - 1]["top"];
    }

    function getCurrentIndex(
        currentScrollY
        ) {
        var activeIndex = 0;
        var probeY = currentScrollY + (window.innerHeight * 0.6);
        var i = 0;

        for (i = 0; i < snapTargets.length; i += 1) {
            if (probeY >= snapTargets[i]["top"] - 2) {
                activeIndex = i;
            } else {
                break;
            }
        }

        return activeIndex;
    }

    function updateActiveSection(
        currentScrollY
        ) {
        var activeIndex = 0;

        if (snapTargets.length === 0 || snapSections.length === 0) {
            return;
        }

        activeIndex = Math.min(
            getCurrentIndex(typeof currentScrollY === "number" ? currentScrollY : window.scrollY),
            snapSections.length - 1
        );

        snapSections.forEach(function(section, index) {
            if (index === activeIndex) {
                section.classList.add("is-active");
                return;
            }

            section.classList.remove("is-active");
        });
    }

    function isInsideManagedRange(
        currentScrollY
        ) {
        var snapStart = snapTargets[0]["top"] - 2;
        var snapEnd = getReleaseTop() + lockReleaseTolerance;

        return currentScrollY >= snapStart && currentScrollY <= snapEnd;
    }

    function waitForSettle(
        targetTop
        ) {
        var startedAt = Date.now();

        function finish(
            ) {
            clearLock();
            clearWheelDistance();
            refreshTargets();
            updateActiveSection(window.scrollY);
        }

        function check(
            ) {
            if (Math.abs(window.scrollY - targetTop) <= 3) {
                finish();
                return;
            }

            if (Date.now() - startedAt > 920) {
                finish();
                return;
            }

            settleFrame = window.requestAnimationFrame(check);
        }

        settleTimer = window.setTimeout(finish, 980);
        settleFrame = window.requestAnimationFrame(check);
    }

    function jumpToIndex(
        targetIndex
        ) {
        var target = snapTargets[targetIndex];

        if (!target) {
            return false;
        }

        keepHeaderVisible();
        clearLock();
        isLocked = true;
        window.scrollTo({
            top: target["top"],
            behavior: "smooth"
        });
        waitForSettle(target["top"]);
        return true;
    }

    function shouldInterceptScroll(
        direction,
        currentScrollY
        ) {
        var currentIndex = 0;
        var releaseTop = 0;

        if (snapTargets.length === 0 || !isInsideManagedRange(currentScrollY)) {
            return false;
        }

        currentIndex = getCurrentIndex(currentScrollY);
        releaseTop = getReleaseTop();

        if (direction > 0) {
            if (
                currentIndex >= snapSections.length &&
                currentScrollY >= releaseTop - 2
            ) {
                return false;
            }

            return true;
        }

        if (direction < 0) {
            if (
                currentIndex === 0 &&
                currentScrollY <= snapTargets[0]["top"] + 2
            ) {
                return false;
            }

            if (
                currentIndex === snapTargets.length - 1 &&
                currentScrollY > releaseTop + lockReleaseTolerance
            ) {
                return false;
            }

            return true;
        }

        return false;
    }

    function stepSections(
        direction
        ) {
        var currentScrollY = 0;
        var currentIndex = 0;

        if (!isEnabled() || isLocked || snapTargets.length === 0) {
            return false;
        }

        currentScrollY = window.scrollY;
        currentIndex = getCurrentIndex(currentScrollY);

        if (direction > 0) {
            return jumpToIndex(Math.min(currentIndex + 1, snapTargets.length - 1));
        }

        if (direction < 0) {
            return jumpToIndex(Math.max(currentIndex - 1, 0));
        }

        return false;
    }

    function handleWheel(
        event
        ) {
        var direction = 0;

        if (!isEnabled()) {
            return;
        }

        refreshTargets();

        if (isLocked) {
            event.preventDefault();
            return;
        }

        if (Math.abs(event.deltaY) < 2) {
            return;
        }

        direction = event.deltaY > 0 ? 1 : -1;

        if (lastWheelDirection !== 0 && lastWheelDirection !== direction) {
            wheelDistance = 0;
        }

        if (!shouldInterceptScroll(direction, window.scrollY)) {
            return;
        }

        event.preventDefault();
        lastWheelDirection = direction;
        wheelDistance += event.deltaY;
        scheduleWheelReset();

        if (Math.abs(wheelDistance) < wheelThreshold) {
            return;
        }

        clearWheelDistance();
        stepSections(direction);
    }

    function handleKeyDown(
        event
        ) {
        var direction = 0;

        if (!isEnabled()) {
            return;
        }

        if (
            event.key === "ArrowDown" ||
            event.key === "PageDown" ||
            (event.key === " " && !event.shiftKey)
        ) {
            direction = 1;
        }

        if (
            event.key === "ArrowUp" ||
            event.key === "PageUp" ||
            (event.key === " " && event.shiftKey)
        ) {
            direction = -1;
        }

        if (direction === 0) {
            return;
        }

        refreshTargets();

        if (!shouldInterceptScroll(direction, window.scrollY)) {
            return;
        }

        event.preventDefault();

        if (!isLocked) {
            stepSections(direction);
        }
    }

    function handleModeChange(
        ) {
        clearLock();
        clearWheelDistance();
        refreshTargets();
        keepHeaderVisible();
        revealAll();
    }

    function bindMediaChange(
        mediaQuery,
        handler
        ) {
        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", handler);
            return;
        }

        if (typeof mediaQuery.addListener === "function") {
            mediaQuery.addListener(handler);
        }
    }

    refreshTargets();
    keepHeaderVisible();
    revealAll();
    window.addEventListener("load", refreshTargets);
    window.addEventListener("resize", refreshTargets, { passive: true });
    window.addEventListener("scroll", function() {
        updateActiveSection(window.scrollY);
    }, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    bindMediaChange(desktopMedia, handleModeChange);
    bindMediaChange(reducedMotionMedia, handleModeChange);
})();
