document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "server/livros.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var books = JSON.parse(xhr.responseText);
            var categoriaList = document.querySelector(".filter-categoria");
            displayCategories(books, categoriaList);
        }
    };
    xhr.send();
});

function displayCategories(books, categoryList) {
    var categoriaSubcategoriaDict = {};

    books.forEach(function(book) {
        var categoriaName = book.categoria.name;
        var subcategoriaName = book.subcategoria.name;

        if (!categoriaSubcategoriaDict[categoriaName]) {
            categoriaSubcategoriaDict[categoriaName] = new Set();
        }
        categoriaSubcategoriaDict[categoriaName].add(subcategoriaName);
    });

    for (const [categoria, subcategorias] of Object.entries(categoriaSubcategoriaDict)) {
        var categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category-list");
        categoryDiv.innerHTML = `<h3>${categoria}</h3>`;
        
        var subcategoryList = document.createElement("div");
        subcategoryList.classList.add("subcategory-list");

        subcategorias.forEach(function(subcategoria) {
            var subcategoryDiv = document.createElement("div");
            subcategoryDiv.innerHTML = `<button type="button" class="btn_subcategoria" value="${subcategoria}">${subcategoria}</button>`;
            subcategoryList.appendChild(subcategoryDiv);

            // Add event listener to the button
            subcategoryDiv.querySelector('button').addEventListener('click', function() {
                window.location.href = `livrosubcategoria.html?subcategoria=${subcategoria}`;
            });
        });

        categoryDiv.appendChild(subcategoryList);
        categoryList.appendChild(categoryDiv);
    }
}