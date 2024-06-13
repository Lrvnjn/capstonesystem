/* Utility functions to save and load data from localStorage */
function saveTransactions() {
    const transactions = [];
    document.querySelectorAll('#transactionTable tbody tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        transactions.push({
            name: cells[0].textContent,
            tourType: cells[1].textContent,
            numAdults: cells[2].textContent,
            numChildren: cells[3].textContent,
            cabanaName: cells[4].textContent,
            totalBill: cells[5].textContent
        });
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transactionTable = document.getElementById('transactionTable').querySelector('tbody');
    transactions.forEach(transaction => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${transaction.name}</td>
            <td>${transaction.tourType}</td>
            <td>${transaction.numAdults}</td>
            <td>${transaction.numChildren}</td>
            <td>${transaction.cabanaName}</td>
            <td>${transaction.totalBill}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        transactionTable.appendChild(newRow);
    });
}

function saveTransactions() {
    const transactions = [];
    document.querySelectorAll('#transactionTable tbody tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        transactions.push({
            name: cells[0].textContent,
            tourType: cells[1].textContent,
            numAdults: cells[2].textContent,
            numChildren: cells[3].textContent,
            cabanaName: cells[4].textContent,
            totalBill: cells[5].textContent
        });
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transactionTable = document.getElementById('transactionTable').querySelector('tbody');
    transactions.forEach(transaction => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${transaction.name}</td>
            <td>${transaction.tourType}</td>
            <td>${transaction.numAdults}</td>
            <td>${transaction.numChildren}</td>
            <td>${transaction.cabanaName}</td>
            <td>${transaction.totalBill}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        transactionTable.appendChild(newRow);
    });
}

/* Load transactions on page load */
window.onload = function() {
    loadTransactions();
    loadGuestRoomTransactions();
};

/*RESORT TRANSACTIONS*/
document.getElementById('payNowButton').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const tourType = document.getElementById('tourType').value;
    const numAdults = parseInt(document.getElementById('numAdults').value, 10);
    const numChildren = parseInt(document.getElementById('numChildren').value, 10);
    const cabanaName = document.getElementById('cabanaName').value;
    const additionalFeeDescription = document.getElementById('additionalFeeDescription').value;
    const additionalFee = parseFloat(document.getElementById('additionalFee').value) || 0;

    const tourRates = {
        DayTour: { adult: 150, child: 50, weekendAdult: 200, weekendChild: 50 },
        NightTour: { adult: 190, child: 50, weekendAdult: 240, weekendChild: 50 }
    };

    const cabanaRates = {
        None: 0,
        KATMON: 1000,
        NARRA: 1000,
        BANABA: 1000,
        KALIOS: 1500,
        BANI: 1500,
        DAPDAP: 1500,
        KAMAGONG: 2000,
        ACACIA: 2000,
        MOLAVE: 2000,
        TIBIG: 2500,
        DUHAT: 2500,
        ALMACIGA: 2500,
        ANONAS: 3500,
        CAMACHILE: 3500,
        KIOSK: 4000,
        BETIS: 7000
    };

    const isWeekend = [0, 6].includes(new Date().getDay());
    const rate = tourRates[tourType];
    const adultRate = isWeekend ? rate.weekendAdult : rate.adult;
    const childRate = isWeekend ? rate.weekendChild : rate.child;

    const totalBill = (numAdults * adultRate) + (numChildren * childRate) + cabanaRates[cabanaName] + additionalFee;

    const transactionTable = document.getElementById('transactionTable').querySelector('tbody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${tourType}</td>
        <td>${numAdults}</td>
        <td>${numChildren}</td>
        <td>${cabanaName}</td>
        <td>${totalBill.toFixed(2)}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    transactionTable.appendChild(newRow);

    document.getElementById('transactionForm').reset();
    saveTransactions();
});

document.getElementById('transactionTable').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
        target.closest('tr').remove();
        saveTransactions();
    } else if (target.classList.contains('edit-btn')) {
        const row = target.closest('tr');
        const cells = row.querySelectorAll('td');

        document.getElementById('name').value = cells[0].textContent;
        document.getElementById('tourType').value = cells[1].textContent;
        document.getElementById('numAdults').value = cells[2].textContent;
        document.getElementById('numChildren').value = cells[3].textContent;
        document.getElementById('cabanaName').value = cells[4].textContent;

        // Remove the row being edited
        row.remove();
        saveTransactions();
    }
});

/*GUEST ROOMS*/
document.getElementById('guestPayNowButton').addEventListener('click', function() {
    const guestName = document.getElementById('guestName').value;
    const numNights = parseInt(document.getElementById('numNights').value, 10);
    const guestNumAdults = parseInt(document.getElementById('guestNumAdults').value, 10);
    const guestNumChildren = parseInt(document.getElementById('guestNumChildren').value, 10);
    const roomName = document.getElementById('roomName').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const guestAdditionalFeeDescription = document.getElementById('guestAdditionalFeeDescription').value;
    const guestAdditionalFee = parseFloat(document.getElementById('guestAdditionalFee').value) || 0;

    const roomRates = {
        'Suite Room': 2500,
        'Deluxe Room': 3000,
        'Family Room': 3500,
        'Villa Quartz': 3000,
        'Villa Jade': 5000,
        'Villa Topaz': 5000,
        'Villa Lazuli': 20000
    };

    const totalBill = (numNights * roomRates[roomName]) + guestAdditionalFee;

    const guestRoomTable = document.getElementById('guestRoomTable').querySelector('tbody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${guestName}</td>
        <td>${numNights}</td>
        <td>${guestNumAdults}</td>
        <td>${guestNumChildren}</td>
        <td>${roomName}</td>
        <td>${roomNumber}</td>
        <td>${totalBill.toFixed(2)}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    guestRoomTable.appendChild(newRow);

    document.getElementById('guestRoomForm').reset();
    saveGuestRoomTransactions();
});

document.getElementById('guestRoomTable').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
        target.closest('tr').remove();
        saveGuestRoomTransactions();
    } else if (target.classList.contains('edit-btn')) {
        const row = target.closest('tr');
        const cells = row.querySelectorAll('td');

        document.getElementById('guestName').value = cells[0].textContent;
        document.getElementById('numNights').value = cells[1].textContent;
        document.getElementById('guestNumAdults').value = cells[2].textContent;
        document.getElementById('guestNumChildren').value = cells[3].textContent;
        document.getElementById('roomName').value = cells[4].textContent;
        document.getElementById('roomNumber').value = cells[5].textContent;

        // Remove the row being edited
        row.remove();
        saveGuestRoomTransactions();
    }
});

window.addEventListener('load', function() {
    loadTransactions();
    loadGuestRoomTransactions();
});

function saveGuestRoomTransactions() {
    const transactions = [];
    document.querySelectorAll('#guestRoomTable tbody tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        transactions.push({
            guestName: cells[0].textContent,
            numNights: cells[1].textContent,
            guestNumAdults: cells[2].textContent,
            guestNumChildren: cells[3].textContent,
            roomName: cells[4].textContent,
            roomNumber: cells[5].textContent,
            totalBill: cells[6].textContent
        });
    });
    localStorage.setItem('guestRoomTransactions', JSON.stringify(transactions));
}

function loadGuestRoomTransactions() {
    const transactions = JSON.parse(localStorage.getItem('guestRoomTransactions') || '[]');
    const guestRoomTable = document.getElementById('guestRoomTable').querySelector('tbody');
    transactions.forEach(transaction => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${transaction.guestName}</td>
            <td>${transaction.numNights}</td>
            <td>${transaction.guestNumAdults}</td>
            <td>${transaction.guestNumChildren}</td>
            <td>${transaction.roomName}</td>
            <td>${transaction.roomNumber}</td>
            <td>${transaction.totalBill}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        guestRoomTable.appendChild(newRow);
    });
}

// Load transactions on page load
window.addEventListener('load', loadGuestRoomTransactions);