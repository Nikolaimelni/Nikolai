document.addEventListener('DOMContentLoaded', function() {
    var toggleButtons = document.querySelectorAll('.toggle-info');
    var responsiveLists = document.querySelectorAll('.responsive-list');

    toggleButtons.forEach(function(toggleButton) {
        toggleButton.addEventListener('click', function() {
            var responsiveList = this.parentNode;
            var isListOpen = responsiveList.classList.contains('open');
            responsiveList.classList.toggle('open');
            
            this.textContent = isListOpen ? 'Tap to open description' : 'Tap to hide description';
        });
    });

    function checkSize() {
        responsiveLists.forEach(function(responsiveList) {
            var toggleButton = responsiveList.querySelector('.toggle-info');
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
    // Получаем элементы бургер-меню и ссылок
    var navbarCollapse = document.querySelector(".navbar-collapse");
    var navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            navbarCollapse.classList.remove("show");
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var elementsToAnimate = document.querySelectorAll('.hidden');

    function checkVisibility() {
        elementsToAnimate.forEach(function(element) {
            var rect = element.getBoundingClientRect();
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
        var modal = new bootstrap.Modal(document.getElementById('imageModal'));
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
