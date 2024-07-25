document.addEventListener('DOMContentLoaded', function() {
    const cube = document.querySelector('.cube');
    const personalStatement = document.querySelector('.personal-statement');
    const projects = document.querySelector('.projects');

    // Cube rotation
    let isDragging = false;
    let startX, startY;
    let rotateX = -20, rotateY = 30;

    const onMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        startX = e.clientX;
        startY = e.clientY;
    };

    const onMouseUp = () => {
        isDragging = false;
    };

    cube.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Scroll effects
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollPosition > windowHeight * 0.5) {
            personalStatement.style.opacity = '1';
        }

        if (scrollPosition > windowHeight * 0.8) {
            projects.style.opacity = '1';
        }
    });

    // Stars background
    function createStars() {
        const starsContainer = document.querySelector('.stars-container');
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            starsContainer.appendChild(star);
        }
    }

    createStars();
});
