$(document).ready(function() {
    $.ajax({
        url: "server/livros.json",
        method: "GET",
        success: function(data) {
            var books = data;
            var bookList = $(".wrapper-box-livros");
            displayBooks(books, bookList);

            // Add search event
            $('#search').on('input', function(event) {
                var searchTerm = event.target.value.toLowerCase();
                var filteredBooks = books.filter(function(book) {
                    return book.title.toLowerCase().includes(searchTerm) || 
                           book.author.toLowerCase().includes(searchTerm);
                });
                displayBooks(filteredBooks, bookList);
            });
        }
    });
});

function displayBooks(books, bookList) {
    bookList.empty(); // Clear the list before displaying filtered books
    books.forEach(function(book) {
        var bookDiv = $("<div>").addClass("box-livro").html(`
            <img src="${book.coverImage}" alt="Capa de ${book.title}" class="cover-image" style="width:100%;height:250px;">
            <div class="book-info">
                <p class="book-title">${book.title}</p>
                <h2 class="book-author">${book.author}</h2>
                <p class="book-year">Ano: ${book.year}</p>
            </div>`);
        
        bookList.append(bookDiv);

        // Add click event
        bookDiv.on('click', function() {
            var bookId = book.id;
            window.location.href = `livro.html?id=${bookId}`; // Redirect to the detail page
        });
    });
}
