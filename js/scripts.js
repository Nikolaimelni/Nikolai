document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-info');
    const responsiveLists = document.querySelectorAll('.responsive-list');

    toggleButtons.forEach(function(toggleButton) {
        toggleButton.addEventListener('click', function() {
            const responsiveList = this.parentNode;
            const isListOpen = responsiveList.classList.contains('open');
            responsiveList.classList.toggle('open');
            
            this.textContent = isListOpen ? 'Tap to open description' : 'Tap to hide description';
        });
    });

    function checkSize() {
        responsiveLists.forEach(function(responsiveList) {
            const toggleButton = responsiveList.querySelector('.toggle-info');
            if (window.innerWidth > 768) {
                responsiveList.classList.add('open');
            } else {
                responsiveList.classList.remove('open');
                toggleButton.textContent = 'Tap to open description';
            }
        });
    }

    window.addEventListener('resize', checkSize);
    checkSize();
});

document.addEventListener("DOMContentLoaded", function() {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            navbarCollapse.classList.remove("show");
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const elementsToAnimate = document.querySelectorAll('.hidden');

    function checkVisibility() {
        elementsToAnimate.forEach(function(element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }

    checkVisibility();

    window.addEventListener('scroll', checkVisibility);
});

let currentImageIndex = 0;
const images = document.querySelectorAll('.img-hover-zoom');

document.querySelectorAll('.img-hover-zoom').forEach((item, index) => {
    item.addEventListener('click', event => {
        currentImageIndex = index;
        updateModalImage();
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        modal.show();
    });
});

document.getElementById('nextButton').addEventListener('click', nextImage);
document.getElementById('prevButton').addEventListener('click', previousImage);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextImage();
    } else if (event.key === 'ArrowLeft') {
        previousImage();
    }
});

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalImage();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalImage();
}

function updateModalImage() {
    const newImageSrc = images[currentImageIndex].getAttribute('src');
    document.getElementById('modalImage').setAttribute('src', newImageSrc);
}

let touchstartX = 0;
let touchendX = 0;

const slider = document.getElementById('imageModal');

slider.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchendX < touchstartX) {
        nextImage();
    }
    
    if (touchendX > touchstartX) {
        previousImage();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("fs-frm");
    const emailInput = document.getElementById("email-address");
    const successMessage = document.getElementById("submitSuccessMessage");
    const errorMessage = document.getElementById("submitErrorMessage");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        resetValidationStates();

        let isValid = true;

        if (!form.checkValidity()) {
            showValidationErrors();
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add("is-invalid");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const formData = new FormData(form);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://formspree.io/f/xyyrkzpq", true);
        xhr.setRequestHeader("Accept", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                successMessage.classList.remove("d-none");
                errorMessage.classList.add("d-none");
            } else {
                errorMessage.textContent = "There was an error submitting the form. Please try again.";
                errorMessage.classList.remove("d-none");
            }
        };

        xhr.onerror = () => {
            errorMessage.textContent = "There was a network error. Please check your internet connection and try again.";
            errorMessage.classList.remove("d-none");
        };

        xhr.send(formData);
    });

    const resetValidationStates = () => {
        form.querySelectorAll(".form-control").forEach(input => {
            input.classList.remove("is-invalid");
        });
    };

    const showValidationErrors = () => {
        form.querySelectorAll(":invalid").forEach(input => {
            input.classList.add("is-invalid");
        });
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email.toLowerCase());
    }
});

