document.addEventListener("DOMContentLoaded", function() {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToFadeIn = document.querySelectorAll('.fade-in');
    elementsToFadeIn.forEach((el) => observer.observe(el));


    const modal = document.getElementById("projectModal");
    if (modal) {
        const modalImage = document.getElementById("modalImage");
        const modalTitle = document.getElementById("modalTitle");
        const modalDetails = document.getElementById("modalDetails");
        const closeButton = document.querySelector(".close-button");
        const projectCards = document.querySelectorAll(".project-card");

        projectCards.forEach(card => {
            card.addEventListener("click", function() {
                const imageSrc = card.querySelector("img").src;
                const title = card.querySelector("h3").textContent;
                const details = card.dataset.details;

                modalImage.src = imageSrc;
                modalTitle.textContent = title;
                modalDetails.textContent = details;

                modal.style.display = "flex";
            });
        });

        function closeModal() {
            modal.style.display = "none";
        }

        closeButton.addEventListener("click", closeModal);

        window.addEventListener("click", function(event) {
            if (event.target == modal) {
                closeModal();
            }
        });
    }
});