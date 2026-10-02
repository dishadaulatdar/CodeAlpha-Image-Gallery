const cards = [...document.querySelectorAll(".card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleCards = cards;
let currentIndex = 0;

// Filter images
function updateVisibleCards(filter) {
  visibleCards = [];

  cards.forEach(card => {
    const show =
      filter === "all" ||
      card.dataset.category === filter;

    card.classList.toggle("hidden", !show);

    if (show) {
      visibleCards.push(card);
    }
  });
}

// Filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    updateVisibleCards(button.dataset.filter);
  });
});

// Open lightbox
function openLightbox(index) {

  if (!visibleCards.length) return;

  currentIndex = index;

  const img =
    visibleCards[currentIndex].querySelector("img");

  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightboxTitle.textContent = img.dataset.title;

  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
}

// Gallery click
cards.forEach(card => {

  card.addEventListener("click", () => {

    const index =
      visibleCards.indexOf(card);

    openLightbox(index);
  });

});

// Next / Previous
function showNext(step) {

  if (!visibleCards.length) return;

  currentIndex =
    (currentIndex + step + visibleCards.length)
    % visibleCards.length;

  const img =
    visibleCards[currentIndex].querySelector("img");

  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightboxTitle.textContent = img.dataset.title;
}

// Close lightbox
function closeLightbox() {

  lightbox.classList.remove("show");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );
}

// Buttons
prevBtn.addEventListener(
  "click",
  () => showNext(-1)
);

nextBtn.addEventListener(
  "click",
  () => showNext(1)
);

closeBtn.addEventListener(
  "click",
  closeLightbox
);

// Close by clicking outside
lightbox.addEventListener("click", event => {

  if (event.target === lightbox) {
    closeLightbox();
  }

});

// Keyboard support
document.addEventListener("keydown", event => {

  if (!lightbox.classList.contains("show")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showNext(-1);
  }

  if (event.key === "ArrowRight") {
    showNext(1);
  }

});
