window.addEventListener("DOMContentLoaded", function() {
    var cultureSection = document.querySelector(".ab1")
    var founderSection = document.querySelector(".ab2")
    var items = Array.from(document.querySelectorAll(".ab1 .list .item"))
    var pics = Array.from(document.querySelectorAll(".ab1 .pics .pic"))
    var revealElements = Array.from(document.querySelectorAll(".reveal"))
    var header = document.querySelector("#siteHeader")
    var headerLogo = document.querySelector(".site-header__logo-image")
    var lightLogoPath = ""
    var darkLogoPath = ""
    var headerUpdateScheduled = false

    if (header) {
        header.classList.remove("site-header--hidden")
    }

    if (headerLogo) {
        lightLogoPath = headerLogo.getAttribute("data-logo-light") || ""
        darkLogoPath = headerLogo.getAttribute("data-logo-dark") || ""
    }

    function setActive(index) {
        items.forEach(function(item, itemIndex) {
            item.classList.toggle("on", itemIndex === index)
        })
        pics.forEach(function(pic, picIndex) {
            pic.classList.toggle("on", picIndex === index)
        })
    }

    function resetCultureState() {
        items.forEach(function(item) {
            item.classList.remove("on")
        })
        pics.forEach(function(pic, picIndex) {
            pic.classList.toggle("on", picIndex === 0)
        })
    }

    function updateCultureMotion(clientX, clientY) {
        var rect = null
        var relativeX = 0
        var relativeY = 0
        var limitedX = 0
        var limitedY = 0
        var moveXLarge = ""
        var moveYLarge = ""
        var moveXSmall = ""
        var moveYSmall = ""
        var leftWidth = ""

        if (!cultureSection || items.length === 0 || pics.length === 0) {
            return
        }

        rect = cultureSection.getBoundingClientRect()
        relativeX = (clientX - rect.left) / rect.width
        relativeY = (clientY - rect.top) / rect.height
        limitedX = Math.max(0, Math.min(1, relativeX))
        limitedY = Math.max(0, Math.min(1, relativeY))
        moveXLarge = ((limitedX - 0.5) * -26).toFixed(2) + "px"
        moveYLarge = ((limitedY - 0.5) * -18).toFixed(2) + "px"
        moveXSmall = ((limitedX - 0.5) * -9).toFixed(2) + "px"
        moveYSmall = ((limitedY - 0.5) * -7).toFixed(2) + "px"
        leftWidth = (43 + (1 - limitedX) * 14).toFixed(2) + "%"
        cultureSection.style.setProperty("--move-x-large", moveXLarge)
        cultureSection.style.setProperty("--move-y-large", moveYLarge)
        cultureSection.style.setProperty("--move-x-small", moveXSmall)
        cultureSection.style.setProperty("--move-y-small", moveYSmall)
        cultureSection.style.setProperty("--left-width", leftWidth)
        setActive(limitedX >= 0.5 ? 1 : 0)
    }

    function updateLogo(isLightSurface) {
        if (!headerLogo) {
            return
        }

        if (isLightSurface) {
            if (darkLogoPath.length > 0) {
                headerLogo.setAttribute("src", darkLogoPath)
            }

            return
        }

        if (lightLogoPath.length > 0) {
            headerLogo.setAttribute("src", lightLogoPath)
        }
    }

    function updateHeaderState() {
        var headerHeight = 84
        var founderTop = Number.POSITIVE_INFINITY
        var useLightSurface = false

        if (!header) {
            return
        }

        headerHeight = header.offsetHeight || 84

        if (founderSection) {
            founderTop = founderSection.getBoundingClientRect().top
            useLightSurface = founderTop <= headerHeight + 24
        }

        header.classList.toggle("site-header--surface-light", useLightSurface)
        header.classList.toggle("site-header--solid", useLightSurface || window.scrollY > 12)
        updateLogo(useLightSurface)
    }

    function queueHeaderUpdate() {
        if (headerUpdateScheduled) {
            return
        }

        headerUpdateScheduled = true

        window.requestAnimationFrame(function() {
            headerUpdateScheduled = false
            updateHeaderState()
        })
    }

    if (cultureSection && items.length > 0 && pics.length > 0) {
        cultureSection.addEventListener("mousemove", function(event) {
            updateCultureMotion(event.clientX, event.clientY)
        })
        cultureSection.addEventListener("mouseenter", function(event) {
            updateCultureMotion(event.clientX, event.clientY)
        })
        cultureSection.addEventListener("mouseleave", function() {
            cultureSection.style.setProperty("--move-x-large", "0px")
            cultureSection.style.setProperty("--move-y-large", "0px")
            cultureSection.style.setProperty("--move-x-small", "0px")
            cultureSection.style.setProperty("--move-y-small", "0px")
            cultureSection.style.setProperty("--left-width", "50%")
            resetCultureState()
        })
    }

    updateHeaderState()
    window.addEventListener("scroll", queueHeaderUpdate, { passive: true })
    window.addEventListener("resize", queueHeaderUpdate)

    if (!window["IntersectionObserver"]) {
        revealElements.forEach(function(element) {
            element.classList.add("in")
        })
        return
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("in")
                observer.unobserve(entry.target)
            }
        })
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
    })

    revealElements.forEach(function(element) {
        observer.observe(element)
    })
})

