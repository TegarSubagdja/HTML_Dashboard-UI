document.addEventListener('DOMContentLoaded', function () {
    const dropzone = document.getElementById('videoDropzone');
    const fileInput = document.getElementById('videoFileInput');
    const videoPreview = document.getElementById('videoPreview');
    const fileNameSpan = document.getElementById('fileName');
    const fileSizeSpan = document.getElementById('fileSize');
    const removeFileButton = document.getElementById('removeFileButton');
    const videoPlayer = document.getElementById('videoPlayer');
    const uploadButton = document.getElementById('uploadButton');

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
        fileNameSpan.textContent = file.name;
        fileSizeSpan.textContent = `Ukuran: ${(file.size / (1024 * 1024)).toFixed(2)} MB`;

        // Preview Video
        currentVideoURL = URL.createObjectURL(file);
        videoPlayer.src = currentVideoURL;

        // Show Elements
        videoPreview.style.display = 'block';
        videoPlayer.style.display = 'block';
        if (uploadButton) uploadButton.disabled = false;

        // Sembunyikan dropzone saat sudah ada file (opsional, agar rapi)
        dropzone.style.display = 'none';
    }

    // --- Reset Function ---
    removeFileButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah trigger klik pada dropzone/input
        resetFileInput();
    });

    function resetFileInput() {
        if (currentVideoURL) URL.revokeObjectURL(currentVideoURL);
        currentVideoURL = null;

        fileInput.value = ''; // Reset input value
        videoPreview.style.display = 'none';
        videoPlayer.src = '';
        dropzone.style.display = 'block'; // Tampilkan kembali dropzone
        if (uploadButton) uploadButton.disabled = true;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('catatanTeknis');
    const charCount = document.getElementById('charCount');

    if (textarea) {
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            // Beri warna merah jika hampir penuh (misal > 450)
            if (length > 450) {
                charCount.classList.add('text-danger');
            } else {
                charCount.classList.remove('text-danger');
            }
        });
    }
});