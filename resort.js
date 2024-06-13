document.addEventListener("DOMContentLoaded", () => {
    const cabanasContainer = document.querySelector(".cabanas");

    let cabanas = JSON.parse(localStorage.getItem('cabanas')) || [];

    function renderCabanas() {
        cabanasContainer.innerHTML = "";

        cabanas.forEach(cabana => {
            const cabanaCard = document.createElement("div");
            cabanaCard.classList.add("cabana-card");

            cabanaCard.innerHTML = `
                <img src="${cabana.cabanaImage}" alt="${cabana.cabanaName}" class="cabana-image">
                <h2>${cabana.cabanaName}</h2>
                <p><strong>Number of Guests:</strong> ${cabana.numberOfGuests}</p>
                <p class="price"><strong>Rate:</strong> ₱${cabana.cabanaRate}</p>
                <div class="rating">
                    <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                </div>
            `;

            cabanasContainer.appendChild(cabanaCard);
        });
    }

    renderCabanas();
});
