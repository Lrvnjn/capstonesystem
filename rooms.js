document.addEventListener('DOMContentLoaded', function() {
    // Scroll functionality
    window.addEventListener('scroll', function() {
        var nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Login modal functionality
    var loginModal = document.getElementById("loginModal");
    var loginLink = document.getElementById("loginLink");
    var closeLoginBtn = document.getElementById("closeLoginModalBtn");

    // Add event listeners for login modal
    if (loginLink) {
        loginLink.onclick = function(event) {
            event.preventDefault();
            loginModal.style.display = "block";
        };
    }

    if (closeLoginBtn) {
        closeLoginBtn.onclick = function() {
            loginModal.style.display = "none";
        };
    }

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    };

    // Fetch rooms data from localStorage
    const roomsData = JSON.parse(localStorage.getItem("rooms")) || [];
    // Render the rooms
    renderRooms(roomsData);

    // Function to render rooms
    function renderRooms(rooms) {
        const roomsContainer = document.querySelector(".rooms");
        if (!roomsContainer) {
            throw new Error('Rooms container not found');
        }
        roomsContainer.innerHTML = ""; // Clear previous content

        rooms.forEach(room => {
            const roomCard = document.createElement("div");
            roomCard.classList.add("room-card");

            roomCard.innerHTML = `
                <img src="${room.roomImage}" alt="${room.roomName}" class="room-image">
                <h2>${room.roomName}</h2>
                <p><strong>Room Number:</strong> ${room.roomNumber}</p>
                <p><strong>Number of Guests:</strong> ${room.guestsNumber}</p>
                <p class="price"><strong>Price:</strong> ₱${room.roomPrice}</p>
                <div class="rating">
                    <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                </div>
                <button class="book-now">Book Now</button>
            `;

            roomsContainer.appendChild(roomCard);
        });
    }
});