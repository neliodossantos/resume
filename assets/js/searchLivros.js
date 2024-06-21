$(document).ready(function() {
    $.ajax({
        url: "server/livros.json",
        type: "GET",
        dataType: "json",
        success: function(books) {
            const $divLivrosPopulares = $('.wrapper-livro-populares');
            const $divLivrosRecentemente = $('.wrapper-livros-recentemente');
            const $divLivrosSearch = $('.wrapper-livro-search');
            const $bookList = $('.wrapper-box-livros');

            // Adiciona o evento de busca
            $('#search').on('input', function(event) {
                var searchTerm = event.target.value.toLowerCase();

                if (searchTerm.length > 0) {
                    $divLivrosPopulares.hide();
                    $divLivrosRecentemente.hide();
                    $divLivrosSearch.show();

                    var filteredBooks = books.filter(function(book) {
                        return book.title.toLowerCase().includes(searchTerm) || 
                               book.author.toLowerCase().includes(searchTerm);
                    });
                    displayBooks(filteredBooks, $bookList);
                } else {
                    $divLivrosPopulares.show();
                    $divLivrosRecentemente.show();
                    $divLivrosSearch.hide();
                }
            });
        }
    });
});

function displayBooks(books, $bookList) {
    $bookList.empty(); // Limpa a lista antes de exibir os livros filtrados
    $.each(books, function(index, book) {
        var $bookDiv = $("<div>").addClass("box-livro");
        $bookDiv.html(`
            <img src="${book.coverImage}" alt="Capa de ${book.title}" class="cover-image" style="width:100%;height:250px;">
            <div class="book-info">
                <p class="book-title">${book.title}</p>
                <h2 class="book-author">${book.author}</h2>
                <p class="book-year">Ano: ${book.year}</p>
            </div>
        `);
        $bookList.append($bookDiv);

        // Adiciona o evento de clique
        $bookDiv.on('click', function() {
            var bookId = $(this).attr('data-id');
            window.location.href = `livro.html?id=${bookId}`; // Redireciona para a página de detalhes
        });
    });
}
