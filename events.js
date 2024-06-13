document.addEventListener("DOMContentLoaded", () => {
    // Function to render events
    function renderEvents() {
        const packageInfoContainer = document.getElementById("packageInfo");

        let packages = JSON.parse(localStorage.getItem('packages')) || [];

        packageInfoContainer.innerHTML = "";

        packages.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");

            eventCard.innerHTML = `
                <img src="${event.packageImage}" alt="${event.packageName}" class="event-image">
                <h2>${event.packageName}</h2>
                <p><strong>Price:</strong> ₱${event.packagePrice}</p>
                <p><strong>Inclusions:</strong> ${event.packageInclusions}</p>
                <div class="rating">
                    <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                </div>
                <button class="register-now">Register Now</button>
            `;

            packageInfoContainer.appendChild(eventCard);
        });
    }

    renderEvents();
});