document.addEventListener("DOMContentLoaded", () => {
    const packageForm = document.getElementById("packageForm");
    const packageTableBody = document.querySelector("#packageTable tbody");
    let packages = JSON.parse(localStorage.getItem('packages')) || [];

    packageForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const packageName = document.getElementById("packageName").value;
        const packagePrice = document.getElementById("packagePrice").value;
        const packageInclusions = document.getElementById("packageInclusions").value;
        const packageImage = document.getElementById("packageImage").files[0]; // Get the selected image file

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;

            const packageData = { packageName, packagePrice, packageInclusions, packageImage: imageUrl };
            packages.push(packageData);
            localStorage.setItem('packages', JSON.stringify(packages));
            renderPackages();
            packageForm.reset();
        };
        reader.readAsDataURL(packageImage); // Read the selected image file as a data URL
    });

    function renderPackages() {
        packageTableBody.innerHTML = "";

        packages.forEach((packageData, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${packageData.packageName}</td>
                <td>₱${packageData.packagePrice}</td>
                <td>${packageData.packageInclusions}</td>
                <td><img src="${packageData.packageImage}" alt="${packageData.packageName}" style="width: 100px; height: auto;"></td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;

            row.querySelector(".edit").addEventListener("click", () => editPackage(index));
            row.querySelector(".delete").addEventListener("click", () => deletePackage(index));

            packageTableBody.appendChild(row);
        });
    }

    function editPackage(index) {
        const packageData = packages[index];
        document.getElementById("packageName").value = packageData.packageName;
        document.getElementById("packagePrice").value = packageData.packagePrice;
        document.getElementById("packageInclusions").value = packageData.packageInclusions;
        packages.splice(index, 1);
        localStorage.setItem('packages', JSON.stringify(packages));
        renderPackages();
    }

    function deletePackage(index) {
        packages.splice(index, 1);
        localStorage.setItem('packages', JSON.stringify(packages));
        renderPackages();
    }

    renderPackages();
});