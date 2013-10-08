var repository = function () {
    
    var books = [
        { id: 1, title : 'La divina comedia', author: 'Dante Alighieri', description: 'Obra mas famosa de su autor, es una de las obras fundamentales de la transicion del pensamiento medieval (teocentrista) al renacentista (antropocentrista).', year: 1306 }
    ];
    
    function getNewId() {
        var maxId = 1, i = 0;
        
        for (i = 0; i < books.length; i += 1) {
            if (books[i].id > maxId) {
                maxId = books[i];
            }
        }
        
        return maxId + 1;
    }
    
    function findById(id) {
        var i = 0;
        
        for (i = 0; i < books.length; i += 1) {
            console.log(books[i].id + ' === ' + id + ' : ' + (books[i].id === id));
            if (parseInt(books[i].id, 10) === parseInt(id, 10)) {
                return books[i];
            }
        }
        
        return null;
    }
    
    function removeBook(book) {
        var index = books.indexOf(book);
        if (index >= 0) {
            books.splice(index, 1);
        }

    }
    
    return {
        getAll:  function () {
            return books;
        },
        get: findById,
        add: function (title, author, description, year) {
            books.push({id: getNewId(), title: title, author: author, description: description, year: year });
        },
        remove: removeBook
    };
    
};