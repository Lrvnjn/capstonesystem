document.addEventListener('DOMContentLoaded', () => {
    const brightnessBars = document.querySelectorAll('.brightness-levels .bar');
    const emailNotificationsToggle = document.getElementById('emailNotificationsToggle');
    const dataBackupToggle = document.getElementById('dataBackupToggle');

    // Load settings from localStorage
    const brightness = localStorage.getItem('brightness') || 3;
    const emailNotifications = localStorage.getItem('email-notifications') === 'true';
    const dataBackup = localStorage.getItem('data-backup') === 'true';

    // Set initial values
    setBrightness(brightness);
    emailNotificationsToggle.checked = emailNotifications;
    dataBackupToggle.checked = dataBackup;

    // Apply brightness
    applyBrightness(brightness);

    // Event listeners for changes
    brightnessBars.forEach(bar => {
        bar.addEventListener('click', () => {
            const level = bar.getAttribute('data-level');
            setBrightness(level);
            applyBrightness(level);
            localStorage.setItem('brightness', level);
        });
    });

    emailNotificationsToggle.addEventListener('change', () => {
        const isEnabled = emailNotificationsToggle.checked;
        localStorage.setItem('email-notifications', isEnabled);
    });

    dataBackupToggle.addEventListener('change', () => {
        const isEnabled = dataBackupToggle.checked;
        localStorage.setItem('data-backup', isEnabled);
    });

    function setBrightness(level) {
        brightnessBars.forEach(bar => {
            bar.classList.remove('active');
            if (bar.getAttribute('data-level') <= level) {
                bar.classList.add('active');
            }
        });
    }

    function applyBrightness(level) {
        const brightnessPercentage = 80 + (level - 1) * 10; // Adjusted brightness range from 80% to 120%
        document.body.style.filter = `brightness(${brightnessPercentage}%)`;
    }
});
