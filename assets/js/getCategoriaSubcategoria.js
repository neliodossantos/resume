$(document).ready(function() {
    $.ajax({
        url: "server/livros.json",
        method: "GET",
        success: function(data) {
            var books = data;
            var categoriaList = $(".filter-categoria");
            displayCategories(books, categoriaList);
        }
    });
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

    $.each(categoriaSubcategoriaDict, function(categoria, subcategorias) {
        var categoryDiv = $("<div>").addClass("category-list").html(`<h3>${categoria}</h3>`);
        
        var subcategoryList = $("<div>").addClass("subcategory-list");

        subcategorias.forEach(function(subcategoria) {
            var subcategoryDiv = $("<div>").html(`<button type="button" class="btn_subcategoria" value="${subcategoria}">${subcategoria}</button>`);
            subcategoryList.append(subcategoryDiv);

            // Add event listener to the button
            subcategoryDiv.find('button').on('click', function() {
                window.location.href = `livrosubcategoria.html?subcategoria=${subcategoria}`;
            });
        });

        categoryDiv.append(subcategoryList);
        categoryList.append(categoryDiv);
    });
}
