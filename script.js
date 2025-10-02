// Lightbox Script
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".close");

// Open lightbox on image click
document.querySelectorAll(".gallery-grid img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    captionText.textContent = img.alt || img.closest("figure")?.querySelector("figcaption")?.innerText || "";
  });
});

// Close lightbox
closeBtn.addEventListener("click", () => lightbox.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.style.display = "none"; });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") lightbox.style.display = "none"; });
