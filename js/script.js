// Einfaches JavaScript für das Template
document.addEventListener('DOMContentLoaded', function() {
    const consentBanner = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    const themeToggle = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
    }

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const darkMode = document.body.classList.toggle('dark-mode');
            const theme = darkMode ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            applyTheme(theme);
        });
    }

    if (consentBanner && acceptBtn && declineBtn) {
        if (!localStorage.getItem('cookieConsent')) {
            consentBanner.style.display = 'block';
        }

        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            consentBanner.style.display = 'none';
            loadGoogleMaps();
        });

        declineBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            consentBanner.style.display = 'none';
        });
    }

    if (localStorage.getItem('cookieConsent') === 'accepted') {
        loadGoogleMaps();
    }
});

function loadGoogleMaps() {
    const mapPlaceholders = document.querySelectorAll('.map-placeholder');
    mapPlaceholders.forEach(placeholder => {
        const iframe = document.createElement('iframe');
        iframe.src = placeholder.dataset.src;
        iframe.className = 'map-embed';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        placeholder.parentNode.replaceChild(iframe, placeholder);
    });
}