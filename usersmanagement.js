document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const userTable = document.querySelector('.user-table tbody');

    // Load existing user data from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Render existing users
    savedUsers.forEach(function (user) {
        const newRow = createUserRow(user);
        userTable.appendChild(newRow);
    });

    userForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const username = document.getElementById('username').value;
        const role = document.getElementById('role').value;

        // Check if user is being edited or added
        const isEditing = userForm.getAttribute('data-editing') === 'true';

        if (isEditing) {
            // Update existing user
            const editingIndex = userForm.getAttribute('data-editing-index');
            const row = userTable.children[editingIndex];
            row.cells[0].textContent = name;
            row.cells[1].textContent = contact;
            row.cells[2].textContent = email;
            row.cells[3].textContent = address;
            row.cells[4].textContent = username;
            row.cells[5].textContent = role;
            userForm.removeAttribute('data-editing');
            userForm.removeAttribute('data-editing-index');
            userForm.querySelector('button[type="submit"]').textContent = 'Add User';
        } else {
            // Create new user object
            const newUser = { name, contact, email, address, username, role };

            // Add new user to savedUsers array
            savedUsers.push(newUser);

            // Save updated savedUsers array to localStorage
            localStorage.setItem('users', JSON.stringify(savedUsers));

            // Create new row for the table
            const newRow = createUserRow(newUser);
            userTable.appendChild(newRow);
        }

        // Reset form fields
        userForm.reset();
    });

    // Event delegation for edit and delete buttons
    userTable.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const row = target.parentElement.parentElement;
            editUser(row);
        } else if (target.classList.contains('delete-btn')) {
            const row = target.parentElement.parentElement;
            deleteUser(row);
        }
    });
});

function createUserRow(user) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${user.name}</td>
        <td>${user.contact}</td>
        <td>${user.email}</td>
        <td>${user.address}</td>
        <td>${user.username}</td>
        <td>${user.role}</td>
        <td class="actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    return newRow;
}

function editUser(row) {
    // Populate form fields with the values from the selected row for editing
    document.getElementById('name').value = row.cells[0].textContent;
    document.getElementById('contact').value = row.cells[1].textContent;
    document.getElementById('email').value = row.cells[2].textContent;
    document.getElementById('address').value = row.cells[3].textContent;
    document.getElementById('username').value = row.cells[4].textContent;
    document.getElementById('role').value = row.cells[5].textContent;

    // Set form attributes for editing mode
    const userForm = document.getElementById('userForm');
    userForm.setAttribute('data-editing', 'true');
    userForm.setAttribute('data-editing-index', row.rowIndex - 1);
    userForm.querySelector('button[type="submit"]').textContent = 'Update';
}

function deleteUser(row) {
    // Remove the row from the table
    row.remove();

    // Remove user from savedUsers array and update localStorage
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const rowIndex = row.rowIndex - 1;
    savedUsers.splice(rowIndex, 1);
    localStorage.setItem('users', JSON.stringify(savedUsers));
}
