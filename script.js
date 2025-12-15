document.addEventListener('DOMContentLoaded', () => {
    // CẤU HÌNH: Điền số lượng ảnh bạn có trong thư mục images
    const totalImages = 13; // Ví dụ bạn có 15 ảnh (1.jpg đến 15.jpg)
    
    const gallery = document.getElementById('gallery');
    
    // 1. Render Gallery tự động
    for (let i = 0; i < totalImages; i++) {
        const div = document.createElement('div');
        div.className = 'grid-item fade-in';
        // Hiệu ứng delay ngẫu nhiên cho tự nhiên
        div.style.transitionDelay = `${Math.random() * 0.5}s`;
        
        const img = document.createElement('img');
        // Giả định định dạng ảnh là .jpg. Nếu có png thì cần logic phức tạp hơn chút
        img.src = `images/${i}.jpg`; 
        img.alt = `Ảnh kỷ niệm ${i}`;
        img.loading = "lazy"; // Tối ưu load
        
        img.onclick = function() {
            openLightbox(this.src);
        }

        div.appendChild(img);
        gallery.appendChild(div);
    }

    // 2. Xử lý Scroll Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 3. Xử lý Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');

    function openLightbox(src) {
        lightbox.style.display = "block";
        lightboxImg.src = src;
    }

    closeBtn.onclick = () => { lightbox.style.display = "none"; }
    
    // Đóng khi click ra ngoài ảnh
    lightbox.onclick = (e) => {
        if (e.target !== lightboxImg) lightbox.style.display = "none";
    }

    // 4. Xử lý Nhạc nền
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('music-playing');
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play();
            musicBtn.classList.add('music-playing');
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // Gợi ý bật nhạc khi user tương tác lần đầu (do chính sách trình duyệt chặn auto-play)
    window.addEventListener('click', () => {
        if (!isPlaying && bgMusic.paused) {
            // Có thể bỏ comment dòng dưới nếu muốn tự bật nhạc khi click bất kỳ đâu
            // musicBtn.click(); 
        }
    }, { once: true });
});