const testimonials = document.querySelectorAll('.testimonial-box');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let currentIndex = 0;

// Function to update the active testimonial
function updateTestimonial(index) {
    // Move the testimonials horizontally
    testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateX(-${index * 100}%)`;
    });
    
    // Update active dot
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Move to the next testimonial
rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial(currentIndex);
});

// Move to the previous testimonial
leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentIndex);
});

// Add functionality to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateTestimonial(currentIndex);
    });
});
