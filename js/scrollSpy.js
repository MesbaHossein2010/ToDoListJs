function updateActiveSection() {
    const navLinks = document.querySelectorAll('.task-item');
    const sections = document.querySelectorAll('.task');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.parentElement.classList.add('active');
        }
    });
}

// Initial call
updateActiveSection();

// Throttle scroll events for better performance
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(updateActiveSection, 100);
}, { passive: true });