function scatterCovers() {
    document.querySelectorAll('.book-cover').forEach((cover) => {
        const randomX = Math.random() * (window.innerWidth - cover.clientWidth);
        const randomY = Math.random() * (window.innerHeight - cover.clientHeight);

        anime({
            targets: cover,
            translateX: randomX,
            translateY: randomY,
            duration: 1000,
            easing: 'easeOutCubic'
        });
    });
}
// Executa a função imediatamente ao carregar a página
scatterCovers();
// Configura a função para ser chamada a cada 2 segundos
setInterval(scatterCovers, 2000);