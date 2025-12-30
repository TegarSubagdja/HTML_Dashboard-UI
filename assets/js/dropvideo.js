document.addEventListener('DOMContentLoaded', function () {
    // --- Video Upload Logic ---
    // Initialize all video upload widgets
    const videoWidgets = document.querySelectorAll('.video-upload-widget');
    
    videoWidgets.forEach((widget) => {
        initVideoWidget(widget);
    });

    function initVideoWidget(widget) {
        const dropzone = widget.querySelector('.js-dropzone');
        const fileInput = widget.querySelector('.js-file-input');
        const videoPreview = widget.querySelector('.js-video-preview');
        const fileNameSpan = widget.querySelector('.js-file-name');
        const fileSizeSpan = widget.querySelector('.js-file-size');
        const removeFileButton = widget.querySelector('.js-remove-file');
        const videoPlayer = widget.querySelector('.js-video-player');
        const uploadButton = widget.querySelector('.js-upload-btn');

        if (!dropzone || !fileInput) return; // Skip if essential elements missing

        let currentVideoURL = null;

        // --- Drag & Drop Handlers ---
        ['dragover', 'dragenter'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.add('border-primary', 'bg-label-orange'); // Feedback visual
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.remove('border-primary', 'bg-label-orange');
            });
        });

        dropzone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) handleFile(files[0]);
        });

        // --- Input Click Handler ---
        // Ensure clicking dropzone triggers input
        dropzone.addEventListener('click', () => {
             fileInput.click();
        });
        
        // Prevent recursive click if dropzone contains input (though input is hidden usually)
        fileInput.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        fileInput.addEventListener('change', function () {
            if (this.files.length > 0) handleFile(this.files[0]);
        });

        // --- Core Processing Function ---
        function handleFile(file) {
            // Validasi Tipe
            if (!file.type.startsWith('video/')) {
                alert('Hanya file video yang diizinkan!');
                return resetFileInput();
            }

            // Validasi Ukuran (50MB)
            const maxSize = 50 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('Ukuran file terlalu besar! Maksimal 50MB.');
                return resetFileInput();
            }

            // Cleanup URL lama (Memory Management)
            if (currentVideoURL) URL.revokeObjectURL(currentVideoURL);

            // Update UI Data
            if (fileNameSpan) fileNameSpan.textContent = file.name;
            if (fileSizeSpan) fileSizeSpan.textContent = `Ukuran: ${(file.size / (1024 * 1024)).toFixed(2)} MB`;

            // Preview Video
            currentVideoURL = URL.createObjectURL(file);
            if (videoPlayer) videoPlayer.src = currentVideoURL;

            // Show Elements
            if (videoPreview) videoPreview.style.display = 'block';
            if (videoPlayer) videoPlayer.style.display = 'block';
            if (uploadButton) uploadButton.disabled = false;

            // Sembunyikan dropzone saat sudah ada file (opsional, agar rapi)
            dropzone.style.display = 'none';
        }

        // --- Reset Function ---
        if (removeFileButton) {
            removeFileButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent bubbling if button is inside form or link
                e.stopPropagation(); 
                resetFileInput();
            });
        }

        function resetFileInput() {
            if (currentVideoURL) URL.revokeObjectURL(currentVideoURL);
            currentVideoURL = null;

            fileInput.value = ''; // Reset input value
            if (videoPreview) videoPreview.style.display = 'none';
            if (videoPlayer) videoPlayer.src = '';
            dropzone.style.display = 'flex'; // Tampilkan kembali dropzone
            if (uploadButton) uploadButton.disabled = true;
        }
    }

    // --- Character Count Logic ---
    const textareas = document.querySelectorAll('.js-char-limit-input');
    
    textareas.forEach(textarea => {
        // Find the corresponding character count display
        // Assuming the structure is close or we find it by searching siblings/parent
        // Strategy: look for the closest container and find .js-char-count-display inside it
        // Or look for a data attribute pointing to the ID (but we want to avoid IDs for uniqueness)
        // Simplest assumption based on HTML structure: same container or sibling
        
        let counterDisplay = null;
        // Try to find the counter in the same input-group parent's sibling
        // Based on current HTML, it is in a separate .form-text container
        // Let's rely on traversing up to a common wrapper
        const wrapper = textarea.closest('.col-12'); // Looking at HTML structure
        if (wrapper) {
            counterDisplay = wrapper.querySelector('.js-char-count-display');
        }

        if (counterDisplay) {
             textarea.addEventListener('input', function() {
                const length = this.value.length;
                counterDisplay.textContent = length;
                
                // Beri warna merah jika hampir penuh (misal > 450)
                if (length > 450) {
                    counterDisplay.classList.add('text-danger');
                } else {
                    counterDisplay.classList.remove('text-danger');
                }
            });
        }
    });
});