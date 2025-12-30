/**
 * Global App Script
 * Mengelola interaksi Sidebar dan Inisialisasi CKEditor
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Logika Sidebar ---
    const initSidebar = () => {
        const toggleBtn = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');

        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
    };

    // --- 2. Logika CKEditor ---
    const initEditor = () => {
        document.querySelectorAll('.editor').forEach(el => {
            ClassicEditor
                .create(el, {
                    toolbar: [
                        'heading', '|',
                        'bold', 'italic', 'link',
                        'bulletedList', 'numberedList', '|',
                        'outdent', 'indent', '|',
                        'undo', 'redo'
                    ]
                })
                .then(editor => {
                    console.log('CKEditor Berhasil Dimuat!', editor);
                })
                .catch(error => {
                    console.error('Gagal memuat CKEditor:', error);
                });
        });
    };

    initSidebar();
    initEditor();
});