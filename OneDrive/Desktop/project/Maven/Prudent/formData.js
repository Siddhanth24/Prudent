document.addEventListener("DOMContentLoaded", () => {
    // Handle the contact form submission
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value,
            option: contactForm.option.value, // Captures the selected radio option
        };

        try {
            const response = await fetch("http://localhost:5000/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            alert(data.message || "Contact Form: Message saved successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to save the Contact Form message.");
        }
    });

    // Handle the footer form submission
    const footerForm = document.getElementById("footerForm");
    footerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            name: "None", // Default name for footer form
            email: footerForm.email.value,
            message: "None", // Default message for footer form
            option: footerForm.option.value, // "Subscribe to Newsletter"
        };

        try {
            const response = await fetch("http://localhost:5000/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            alert(data.message || "Footer Form: Subscription saved successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to save the Footer Form subscription.");
        }
    });
});

