// testimonial-slider.js
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-box');
const totalTestimonials = testimonials.length;

// Initialize the first testimonial to be visible
testimonials[currentIndex].classList.add('active');

// Function to show the next testimonial
function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active'); // Remove active class from all testimonials
        if (i === index) {
            testimonial.classList.add('active'); // Add active class to the current index
        }
    });
    
    // Update the dots
    updateDots(index);
}

// Function to handle next and previous actions
function navigate(direction) {
    currentIndex += direction; // Increment or decrement the index
    if (currentIndex < 0) {
        currentIndex = totalTestimonials - 1; // Loop back to the last testimonial
    } else if (currentIndex >= totalTestimonials) {
        currentIndex = 0; // Loop back to the first testimonial
    }
    showTestimonial(currentIndex); // Show the current testimonial
}

// Function to update the dots
function updateDots(index) {
    dots.forEach((dot, i) => {
        dot.classList.remove('active'); // Remove active class from all dots
        if (i === index) {
            dot.classList.add('active'); // Add active class to the current dot
        }
    });
}

// Add event listeners for navigation arrows
document.querySelector('.left-arrow').addEventListener('click', () => navigate(-1));
document.querySelector('.right-arrow').addEventListener('click', () => navigate(1));

// Add event listeners for dots
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index; // Update current index to the clicked dot
        showTestimonial(currentIndex); // Show the selected testimonial
    });
});

// Initialize the dots on page load
updateDots(currentIndex);
