const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");

let currentIndex = 0;

function updateSlider(index) {
    if (slides.length === 0) return;

    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

const autoPlay = setInterval(() => {
    updateSlider(currentIndex + 1);
}, 2500);

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        updateSlider(currentIndex + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        updateSlider(currentIndex - 1);
    });
}

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        updateSlider(i);
    });
});
// 1. About Tab Switcher
const aboutTabs = document.querySelectorAll(".about-tab");
const aboutBox = document.getElementById("about-box");

const aboutContents = {
    profile: "Nahar Builders is a trusted construction company based in Chattogram, Bangladesh, committed to delivering high-quality residential and commercial projects with modern design, structural integrity, and long-term durability.",
    mission: "Our mission is to engineer safe, sustainable, and modern residential and commercial spaces following BNBC and CDA standards while ensuring timely delivery and transparent client service.",
    commitment: "We are committed to using tested construction materials, skilled engineering supervision, and honest project management so every structure stands strong for generations."
};

aboutTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        aboutTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const key = tab.getAttribute("data-about");
        if (aboutBox && aboutContents[key]) {
            aboutBox.textContent = aboutContents[key];
        }
    });
});

// 2. Project Filter Tabs
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        projectCards.forEach((card) => {
            const status = card.getAttribute("data-status");
            const type = card.getAttribute("data-type");

            const shouldShow =
                filterValue === "all" ||
                status === filterValue ||
                type === filterValue;

            card.classList.toggle("hide-card", !shouldShow);
        });
    });
});

// 3. Project Details Modal
const modal = document.getElementById("projectModal");
const closeModalBtn = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImg");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLocation = document.getElementById("modalLocation");
const modalStories = document.getElementById("modalStories");

projectCards.forEach((card) => {
    card.addEventListener("click", () => {
        const imgEl = card.querySelector(".project-thumb img");
        const catEl = card.querySelector(".project-body small");
        const titleEl = card.querySelector(".project-body h3");
        const descEl = card.querySelector(".project-body p");
        const footSpans = card.querySelectorAll(".project-foot span");

        if (modal && imgEl && titleEl) {
            modalImg.src = imgEl.getAttribute("src");
            modalImg.alt = titleEl.textContent;
            modalCategory.textContent = catEl ? catEl.textContent : "";
            modalTitle.textContent = titleEl.textContent;
            modalDesc.textContent = descEl ? descEl.textContent : "";
            modalLocation.textContent = footSpans[0] ? footSpans[0].textContent : "";
            modalStories.textContent = footSpans[1] ? footSpans[1].textContent : "";
            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
        }
    });
});

function closeProjectModal() {
    if (modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
    }
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeProjectModal);
}

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
}

// 4. Estimate Form Submit Feedback
const estimateForm = document.getElementById("estimateForm");
const estimateSuccess = document.getElementById("estimateSuccess");
const fullNameInput = document.getElementById("fullName");

if (estimateForm) {
    estimateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const clientName = fullNameInput && fullNameInput.value.trim() ? fullNameInput.value.trim() : "there";
        if (estimateSuccess) {
            estimateSuccess.textContent = `Thank you, ${clientName}! Your estimate request has been received. Our engineering team will contact you within 24 hours.`;
        }
        estimateForm.reset();
    });
}

// 5. Scroll To Top & Active Nav Link
const scrollTopBtn = document.getElementById("scrollTopBtn");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle("show", window.scrollY > 350);
    }

    let currentSectionId = "home";
    sections.forEach((sec) => {
        const top = sec.offsetTop - 140;
        if (window.scrollY >= top) {
            currentSectionId = sec.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("nav-active", href === `#${currentSectionId}`);
    });
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}