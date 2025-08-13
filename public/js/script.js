document.addEventListener('DOMContentLoaded', () => {

    // Lista de imagens do carrossel, movida para o JavaScript
    const carouselImages = [
        {
            src: "https://emobile.com.br/site/wp-content/uploads/2025/04/iSaloni-2025.webp",
            alt: "Imagem do Salone del Mobile Milano"
        },
        {
            src: "https://revistause.com.br/wp-content/uploads/2025/04/salone-mobile-milano-foto-ludovica-mangini-1000x600.jpg",
            alt: "Design de móveis no Salone del Mobile Milano"
        },
        {
            src: "https://hettich.com.br/wp-content/uploads/sites/2/2024/04/Cover_PDM_Ph.-AR-salonemilano.jpg.webp",
            alt: "Entrada do Salone del Mobile Milano"
        },
        {
            src: "https://images.adsttc.com/media/images/65cc/a738/f2f1/3e0e/d02a/4f73/newsletter/salone-del-mobile-2024-announces-program-including-interventions-by-david-lynch_1.jpg?1707911010",
            alt: "Design moderno no Salone del Mobile"
        },
        {
            src: "https://www.salonemilano.it/sites/default/files/styles/libero/public/images/articles/2024-03/cover_Under-The-Surface-salonemilano_0.jpg.webp?itok=4n_rPU_4",
            alt: "Design moderno no Salone del Mobile"
        }
    ];

    // Função para renderizar o carrossel a partir da lista
    function renderCarousel() {
        const carouselElement = document.querySelector('.carousel');

        // Limpa o conteúdo atual do carrossel no HTML
        carouselElement.innerHTML = '';

        // Percorre a lista de imagens e cria os elementos <img>
        carouselImages.forEach((imageData, index) => {
            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.alt;

            // Adiciona a classe 'active' na primeira imagem para ser visível
            if (index === 0) {
                img.classList.add('active');
            }

            // Adiciona a imagem ao carrossel no HTML
            carouselElement.appendChild(img);
        });
    }

    // Chama a função para renderizar o carrossel no carregamento da página
    renderCarousel();


    const btnParticipar = document.querySelector('.btn-participar');

    btnParticipar.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });

    // Efeitos de micro-interação nos ícones dos passos
    const passosIcons = document.querySelectorAll('.passo img');

    passosIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease-in-out';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });

    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

    allAnchorLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Ajuste o valor da margem se necessário
                    behavior: 'smooth'
                });
            }
        });
    });


    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel img');

    // Mostrar a imagem inicial
    if (slides.length > 0) {
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 3200);


});

