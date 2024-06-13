document.addEventListener("DOMContentLoaded", () => {
    const cabanaForm = document.getElementById("cabanaForm");
    const cabanaTableBody = document.querySelector("#cabanaTable tbody");
    let cabanas = JSON.parse(localStorage.getItem('cabanas')) || [];

    cabanaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const cabanaName = document.getElementById("cabanaName").value;
        const numberOfGuests = document.getElementById("numberOfGuests").value;
        const cabanaRate = document.getElementById("cabanaRate").value;
        const cabanaImage = document.getElementById("cabanaImage").files[0]; // Get the selected image file

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const cabana = { cabanaName, numberOfGuests, cabanaRate, cabanaImage: imageUrl };
            cabanas.push(cabana);
            localStorage.setItem('cabanas', JSON.stringify(cabanas));
            renderCabanas();
            cabanaForm.reset();
        };
        reader.readAsDataURL(cabanaImage); // Read the selected image file as a data URL
    });

    function renderCabanas() {
        cabanaTableBody.innerHTML = "";

        cabanas.forEach((cabana, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${cabana.cabanaName}</td>
                <td>${cabana.numberOfGuests}</td>
                <td>₱${cabana.cabanaRate}</td>
                <td><img src="${cabana.cabanaImage}" alt="${cabana.cabanaName}" style="width: 100px; height: auto;"></td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;

            row.querySelector(".edit").addEventListener("click", () => editCabana(index));
            row.querySelector(".delete").addEventListener("click", () => deleteCabana(index));

            cabanaTableBody.appendChild(row);
        });
    }

    function editCabana(index) {
        const cabana = cabanas[index];
        document.getElementById("cabanaName").value = cabana.cabanaName;
        document.getElementById("numberOfGuests").value = cabana.numberOfGuests;
        document.getElementById("cabanaRate").value = cabana.cabanaRate;
        cabanas.splice(index, 1);
        localStorage.setItem('cabanas', JSON.stringify(cabanas));
        renderCabanas();
    }

    function deleteCabana(index) {
        cabanas.splice(index, 1);
        localStorage.setItem('cabanas', JSON.stringify(cabanas));
        renderCabanas();
    }

    renderCabanas();
});
