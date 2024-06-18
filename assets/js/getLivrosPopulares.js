document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "server/livros.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var books = JSON.parse(xhr.responseText);

            var popularesLivros = books.filter(x => x.like >= 100);
            console.log(popularesLivros);
            var bookCarousel = document.querySelector(".book-carousel");

            displayBook(popularesLivros, bookCarousel);

            // Initialize Slick
            $('.book-carousel').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                prevArrow: $('.slick-prev1'),
                nextArrow: $('.slick-next1'),
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

function displayBook(books, bookCarousel) {
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
            </div>`;
        bookCarousel.appendChild(bookDiv);

        // Adiciona o evento de clique
        bookDiv.addEventListener('click', function() {
            var bookId = this.getAttribute('data-id');
            window.location.href = `livro.html?id=${bookId}`; // Redireciona para a página de detalhes
        });
    });
}
