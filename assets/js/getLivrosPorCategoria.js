document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "server/livros.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var books = JSON.parse(xhr.responseText);
            var bookList = document.querySelector(".wrapper-box-livros");
            displayBooks(books, bookList);
            // Adiciona o evento de busca
            document.getElementById('search').addEventListener('input', function(event) {
                var searchTerm = event.target.value.toLowerCase();
                var filteredBooks = books.filter(function(book) {
                    return book.title.toLowerCase().includes(searchTerm) || 
                           book.author.toLowerCase().includes(searchTerm);
                });
                displayBooks(filteredBooks, bookList);

                
            });
        }
        
    };
    xhr.send();
});

function displayBooks(books, bookList) {
    bookList.innerHTML = ''; // Limpa a lista antes de exibir os livros filtrados
    books.forEach(function(book) {
        var bookDiv = document.createElement("div");
        bookDiv.classList.add("box-livro");
        bookDiv.innerHTML = `
            <img src="${book.coverImage}" alt="Capa de ${book.title}" class="cover-image" style="width:100%;height:250px;">
            <div class="book-info">
                <p class="book-title">${book.title}</p>
                <h2 class="book-author">${book.author}</h2>
                <p class="book-year">Ano: ${book.year}</p>
            </div>`;
        bookList.appendChild(bookDiv);
    });

    // Adiciona o evento de clique
    bookDiv.addEventListener('click', function() {
        var bookId = this.getAttribute('data-id');
        window.location.href = `livro.html?id=${bookId}`; // Redireciona para a página de detalhes
    });
}
