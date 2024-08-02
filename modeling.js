document.addEventListener('DOMContentLoaded', function () {
    function setupCarousel(carouselId) {
        const carouselContainer = document.getElementById(carouselId);
        const photos = carouselContainer.querySelectorAll('.carousel-photo');
        const prevButton = carouselContainer.querySelector('.prev');
        const nextButton = carouselContainer.querySelector('.next');
        const dotsContainer = carouselContainer.querySelector('.carousel-dots');
        let currentIndex = 0;

        function showPhoto(index) {
            photos.forEach((photo, i) => {
                photo.style.display = i === index ? 'block' : 'none';
            });
            updateDots(index);
        }

        function updateDots(index) {
            dotsContainer.innerHTML = '';
            photos.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === index) dot.classList.add('active-dot');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    showPhoto(currentIndex);
                });
                dotsContainer.appendChild(dot);
            });
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
            showPhoto(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % photos.length;
            showPhoto(currentIndex);
        });

        showPhoto(currentIndex); // Initialize carousel
    }

    // Setup carousels
    setupCarousel('carousel1');
    setupCarousel('carousel2');

    // Modal functionality
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    const photos = document.querySelectorAll('.carousel-photo');

    function showModal(src) {
        modalContainer.style.display = 'block';
        modalContent.src = src;
    }

    function hideModal() {
        modalContainer.style.display = 'none';
    }

    photos.forEach(photo => {
        photo.addEventListener('click', function () {
            const src = this.getAttribute('data-src');
            showModal(src);
        });
    });

    const closeButton = document.getElementById('close');
    closeButton.addEventListener('click', hideModal);

    modalContainer.addEventListener('click', function (event) {
        if (event.target === modalContainer) {
            hideModal();
        }
    });
});

/* SideBar JS */
document.addEventListener('DOMContentLoaded', function () {
    var dropdownToggle = document.getElementById('dropdownToggle');
    var dropdownMenu = document.getElementById('dropdownMenu');
  
    console.log(dropdownToggle); // Check if this is not null
    console.log(dropdownMenu); // Check if this is not null
  
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action
            dropdownMenu.classList.toggle('show');
        });
  
        document.addEventListener('click', function (event) {
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
  });
  