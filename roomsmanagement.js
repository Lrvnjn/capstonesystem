document.addEventListener("DOMContentLoaded", () => {
    const roomForm = document.getElementById("roomForm");
    const roomTableBody = document.querySelector("tbody");

    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];

    roomForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const roomName = document.getElementById("roomName").value;
        const guestsNumber = document.getElementById("guestsNumber").value;
        const roomPrice = document.getElementById("roomPrice").value;
        const roomNumber = document.getElementById("roomNumber").value;
        const roomImage = document.getElementById("roomImage").files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const room = { roomName, guestsNumber, roomPrice, roomNumber, roomImage: imageUrl };
            rooms.push(room);
            localStorage.setItem('rooms', JSON.stringify(rooms));
            renderRooms();
            roomForm.reset();
        };
        reader.readAsDataURL(roomImage);
    });

    function renderRooms() {
        roomTableBody.innerHTML = "";

        rooms.forEach((room, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${room.roomName}</td>
                <td>${room.guestsNumber}</td>
                <td>₱${room.roomPrice}</td>
                <td>${room.roomNumber}</td>
                <td><img src="${room.roomImage}" alt="${room.roomName}" style="width: 100px; height: auto;"></td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;

            row.querySelector(".edit").addEventListener("click", () => editRoom(index));
            row.querySelector(".delete").addEventListener("click", () => deleteRoom(index));

            roomTableBody.appendChild(row);
        });
    }

    function editRoom(index) {
        const room = rooms[index];
        document.getElementById("roomName").value = room.roomName;
        document.getElementById("guestsNumber").value = room.guestsNumber;
        document.getElementById("roomPrice").value = room.roomPrice;
        document.getElementById("roomNumber").value = room.roomNumber;
        // Note: You can't prefill file input fields for security reasons
        rooms.splice(index, 1);
        localStorage.setItem('rooms', JSON.stringify(rooms));
        renderRooms();
    }

    function deleteRoom(index) {
        rooms.splice(index, 1);
        localStorage.setItem('rooms', JSON.stringify(rooms));
        renderRooms();
    }

    renderRooms();
});
