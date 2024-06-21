$(document).ready(function() {
    $.ajax({
        url: "server/livros.json",
        type: "GET",
        dataType: "json",
        success: function(books) {
            // Função para comparar as datas de publicação
            function compareDates(a, b) {
                return new Date(b.publishedDate) - new Date(a.publishedDate);
            }

            // Ordena os livros pela data de publicação (mais recente primeiro)
            var livrosRecentes = books.sort(compareDates);

            var $bookRecentekCarousel = $(".book-recente-carousel");
            displayBooks(livrosRecentes, $bookRecentekCarousel);

            // Configuração do carousel usando Slick
            $bookRecentekCarousel.slick({
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
    });
});

function displayBooks(books, $bookCarousel) {
    $bookCarousel.empty(); // Limpa a lista antes de exibir os livros filtrados
    $.each(books, function(index, book) {
        var $bookDiv = $("<div>").addClass("box-livro").attr("data-id", book.id);
        $bookDiv.html(`
            <img src="${book.coverImage}" alt="Capa de ${book.title}" class="cover-image" style="width:100%;height:250px;">
            <div class="book-info">
                <p class="book-title">${book.title}</p>
                <h2 class="book-author">${book.author}</h2>
                <p class="book-year">Ano: ${book.year}</p>
                <p class="book-published-date">Publicado em: ${new Date(book.publishedDate).toLocaleDateString()}</p>
            </div>
        `);
        $bookCarousel.append($bookDiv);

        // Adiciona o evento de clique
        $bookDiv.on('click', function() {
            var bookId = $(this).attr('data-id');
            window.location.href = `livro.html?id=${bookId}`; // Redireciona para a página de detalhes
        });
    });
}
