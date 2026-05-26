const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");
const menuIcon = document.getElementById("menuIcon");

// =======================
// OPEN MENU
// =======================
function openMenu() {
    nav.classList.add("active");

    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");

    document.body.style.overflow = "hidden";
}

// =======================
// CLOSE MENU
// =======================
function closeMenu() {
    nav.classList.remove("active");

    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");

    document.body.style.overflow = "auto";

    // reset swipe transform
    nav.style.transform = "";
}

// =======================
// TOGGLE BUTTON
// =======================
menuToggle.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// =======================
// CLICK OUTSIDE CLOSE
// =======================
window.addEventListener("click", (e) => {
    if (
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {
        closeMenu();
    }
});


// =======================
// SWIPE TO CLOSE (PRO UX)
// =======================
let startX = 0;
let currentX = 0;
let isDragging = false;

nav.addEventListener("touchstart", (e) => {
    if (!nav.classList.contains("active")) return;

    startX = e.touches[0].clientX;
    isDragging = true;
});

nav.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;

    let diff = currentX - startX;

    // only allow swipe RIGHT to close
    if (diff > 0) {
        nav.style.transform = `translateX(${diff}px)`;
    }
});

nav.addEventListener("touchend", () => {
    if (!isDragging) return;

    isDragging = false;

    let diff = currentX - startX;

    nav.style.transform = "";

    // threshold to close
    if (diff > 80) {
        closeMenu();
    }
});

// DOM Element Targets
const modal = document.getElementById('bookingModal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButton = document.querySelector('.close-btn');
const appointmentForm = document.getElementById('appointmentForm');

// Event listener loop to hook up all "Book Now / Book Appointment" Buttons
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
});

// Close Modal when pressing 'X'
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close Modal if user clicks outside the modal layout box 
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submissions elegantly
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('clientName').value;
    const service = document.getElementById('serviceSelect').value;
    const date = document.getElementById('bookDate').value;

    // Display localized interactive callback message to user
    const phone = "2348156274861";

    const message =
`Hello, I want to book an appointment:

Name: ${name}
Service: ${service}
Date: ${date}

I found your business online.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    
    // Clear & collapse modal
    appointmentForm.reset();
    modal.style.display = 'none';
});

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
});