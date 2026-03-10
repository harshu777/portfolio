document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you don't want it to fade out again
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const elementsToAnimate = document.querySelectorAll('.fade-in');
    
    // Add small delays for grid items if needed, or simply observe all
    elementsToAnimate.forEach(el => {
        elementObserver.observe(el);
    });

    // Optional parallax effect on mouse move for the background glows
    const glows = document.querySelectorAll('.ambient-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        glows.forEach((glow, index) => {
            const factor = (index + 1) * 20;
            const moveX = (x * factor) - (factor/2);
            const moveY = (y * factor) - (factor/2);
            
            glow.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Ensure smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });
});
