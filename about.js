/*LOGINFORM*/
// Get modal elements
var modal = document.getElementById("loginModal");
var loginLink = document.getElementById("loginLink");
var closeBtn = document.getElementsByClassName("close")[0];

// Open modal on login link click
loginLink.onclick = function(event) {
    event.preventDefault();
    modal.style.display = "block";
}

// Close modal on close button click
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close modal on outside click
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Login form script
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin') {
        window.location.href = 'dashboard.html';
    } else if (username === 'fdesk_lorven' && password === 'fdlorven') {
        window.location.href = 'dailytransaction.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});