document.addEventListener('DOMContentLoaded', function () {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');

    function showModal(src) {
        modalContainer.style.display = 'block';
        modalContent.src = src;
    }

    function hideModal() {
        modalContainer.style.display = 'none';
    }

    const photos = document.querySelectorAll('.modeling-photo');
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
