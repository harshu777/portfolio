document.addEventListener('DOMContentLoaded', () => {

    // Smooth Intersection Observer for revealing elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS keyframes
                entry.target.classList.add('visible');
                // Unobserve so animation only happens once per page load
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach(el => {
        elementObserver.observe(el);
    });

    // Subtle Parallax for the abstract mesh orbs in the background
    const meshOrbs = document.querySelectorAll('.mesh-orb');

    document.addEventListener('mousemove', (e) => {
        // Calculate normalized mouse coords (-1 to 1)
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        meshOrbs.forEach((orb, index) => {
            // Give each orb a slightly different depth multiplier
            const depth = (index + 1) * 15;
            const moveX = x * depth;
            const moveY = y * depth;

            // Using requestAnimationFrame for smoother rendering could be added here
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed top nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting on scroll using Intersection Observer
    const navLinks = document.querySelectorAll('.cmd-nav .cmd-link');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const navObserverOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Trigger when section occupies the middle portion of the viewport
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });
});
