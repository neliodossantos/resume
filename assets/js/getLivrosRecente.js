document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "server/livros.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var books = JSON.parse(xhr.responseText);

            // Função para comparar as datas de publicação
            function compareDates(a, b) {
                return new Date(b.publishedDate) - new Date(a.publishedDate);
            }

            // Ordena os livros pela data de publicação (mais recente primeiro)
            var livrosRecentes = books.sort(compareDates);

            var bookRecentekCarousel = document.querySelector(".book-recente-carousel");
            displayBooks(livrosRecentes, bookRecentekCarousel);

            // Configuração do carousel usando Slick
            $('.book-recente-carousel').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                prevArrow: $('.slick-prev2'),
                nextArrow: $('.slick-next2'),
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    };
    xhr.send();
});

function displayBooks(books, bookCarousel) {
    bookCarousel.innerHTML = ''; // Limpa a lista antes de exibir os livros filtrados
    books.forEach(function(book) {
        var bookDiv = document.createElement("div");
        bookDiv.classList.add("box-livro");
        bookDiv.setAttribute("data-id", book.id); // Adiciona o data-id com o identificador do livro
        bookDiv.innerHTML = `
            <img src="${book.coverImage}" alt="Capa de ${book.title}" class="cover-image" style="width:100%;height:250px;">
            <div class="book-info">
                <p class="book-title">${book.title}</p>
                <h2 class="book-author">${book.author}</h2>
                <p class="book-year">Ano: ${book.year}</p>
                <p class="book-published-date">Publicado em: ${new Date(book.publishedDate).toLocaleDateString()}</p>
            </div>`;
        bookCarousel.appendChild(bookDiv);

         // Adiciona o evento de clique
        bookDiv.addEventListener('click', function() {
            var bookId = this.getAttribute('data-id');
            window.location.href = `livro.html?id=${bookId}`; // Redireciona para a página de detalhes
        });
    });
}
