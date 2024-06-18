document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "server/livros.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var books = JSON.parse(xhr.responseText);
            const divLivrosPopulares  = document.querySelector('.wrapper-livro-populares');
            const divLivrosRecentemente  =  document.querySelector('.wrapper-livros-recentemente');
            const divLivrosSearch  =  document.querySelector('.wrapper-livro-search');

            
            var bookList = document.querySelector(".wrapper-box-livros");
            // Adiciona o evento de busca
            document.getElementById('search').addEventListener('input', function(event) {
                var searchTerm = event.target.value.toLowerCase();

                if(searchTerm.length > 0){
                    divLivrosPopulares.style.display = 'none';
                    divLivrosRecentemente.style.display = 'none';
                    divLivrosSearch.style.display = 'block';
                    var filteredBooks = books.filter(function(book) {
                        return book.title.toLowerCase().includes(searchTerm) || 
                               book.author.toLowerCase().includes(searchTerm);
                    });
                    displayBooks(filteredBooks, bookList);    
                }else{
                    divLivrosPopulares.style.display = 'block';
                    divLivrosRecentemente.style.display = 'block';
                    divLivrosSearch.style.display = 'none';

                }
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
            <img src="https://neliodossantos.github.io/resume/assets/img/${book.coverImage}" alt="Capa de ${book.title}" class="cover-image" style="width:100%;height:250px;">
            <div class="book-info">
                <p class="book-title">${book.title}</p>
                <h2 class="book-author">${book.author}</h2>
                <p class="book-year">Ano: ${book.year}</p>
            </div>`;
        bookList.appendChild(bookDiv);
    });
}
