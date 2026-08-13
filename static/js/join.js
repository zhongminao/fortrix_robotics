(function() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".join-side-nav__item"));
    var sections = links.map(function(link) {
        var sectionId = link.dataset.section;

        return document.querySelector("#" + sectionId);
    }).filter(Boolean);

    if (!links.length || !sections.length) {
        return;
    }

    function setActive(sectionId) {
        links.forEach(function(link) {
            link.classList.toggle("is-active", link.dataset.section === sectionId);
        });
    }

    function updateActiveSection() {
        var activeSection = sections[0];
        var triggerY = window.innerHeight * 0.38;

        sections.forEach(function(section) {
            if (section.getBoundingClientRect().top <= triggerY) {
                activeSection = section;
            }
        });

        setActive(activeSection.id);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
})();


