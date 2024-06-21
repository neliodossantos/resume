$(document).ready(function() {
    $.ajax({
        url: "server/livros.json",
        method: "GET",
        success: function(data) {
            var books = data;

            var popularesLivros = books.filter(x => x.like >= 100);
            console.log(popularesLivros);
            var bookCarousel = $(".book-carousel");

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
    });
});

function displayBook(books, bookCarousel) {
    bookCarousel.empty(); // Clear the list before displaying filtered books
    books.forEach(function(book) {
        var bookDiv = $("<div>").addClass("box-livro").attr("data-id", book.id).html(`
            <img src="${book.coverImage}" alt="Capa de ${book.title}" class="cover-image" style="width:100%;height:250px;">
            <div class="book-info">
                <p class="book-title">${book.title}</p>
                <h2 class="book-author">${book.author}</h2>
                <p class="book-year">Ano: ${book.year}</p>
            </div>`);
        bookCarousel.append(bookDiv);

        // Add click event
        bookDiv.on('click', function() {
            var bookId = $(this).data('id');
            window.location.href = `livro.html?id=${bookId}`; // Redirect to the detail page
        });
    });
}
