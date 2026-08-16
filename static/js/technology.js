document.body.classList.add("technology-body");

if (window.lucide) {
    window.lucide.createIcons();
}

const header = document.querySelector("#siteHeader");
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const stackCards = Array.from(document.querySelectorAll(".stack-card"));

function selectStackCard(
    selectedCard
    ) {
    stackCards.forEach((card) =>
    {
        card.classList.toggle("is-selected", card === selectedCard);
    });
}

stackCards.forEach((card) =>
{
    card.setAttribute("tabindex", "0");

    card.addEventListener("click", () =>
    {
        selectStackCard(card);
    });

    card.addEventListener("keydown", (event) =>
    {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        event.preventDefault();
        selectStackCard(card);
    });
});

function updateHeader(
    ) {
    if (!header) {
        return;
    }

    header.classList.toggle("is-solid", window.scrollY > 18);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) =>
    {
        entries.forEach((entry) =>
        {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
    });

    revealItems.forEach((item) =>
    {
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach((item) =>
    {
        item.classList.add("is-visible");
    });
}

