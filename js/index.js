function bookService() {

    var apiRoot = 'https://api.parse.com/1/classes/';
    var contentType = 'application/json; charset=utf-8';
    var datatType = 'json';
    var headers = {
        'X-Parse-Application-Id': 'JIEJ69dAxMHo28m2RS1ixALWyDRXuNZadcHr5wcM', 
        'X-Parse-REST-API-Key': 'FDaruzzwklbvgKWwkSGiA3HzBN2PWhu8EBFgxS16'
    };
    
    function ajaxRequest(resource, data, method)
    {
        return $.ajax({
            url: apiRoot + resource, 
            type: method,
            data: data,
            contentType: contentType, 
            dataType: datatType, 
            headers: headers
        });
    }
    
    function ajaxGet(resource, data)
    {
        return ajaxRequest(resource, data, 'get');
    }
    
    function ajaxPost(resource, data)
    {
        return ajaxRequest(resource, JSON.stringify(data), 'post');
    }
    
    function ajaxDelete(resource, data)
    {
        return ajaxRequest(resource, data, 'delete');
    }
    
    function ajaxPut(resource, data)
    {
        return ajaxRequest(resource, JSON.stringify(data), 'put');
    }
    
    return {
        getAll: function() {
            return ajaxGet('Book');
        },
        get: function (id) {
            return ajaxGet('Book/' + id);
        },
        add: function (book) {
            return ajaxPost('Book', book);
        },
        remove: function(book) {
            return ajaxDelete('Book/' + book.objectId);
        },
        update: function (book) {
            return ajaxPut('Book/' + book.objectId, book);
        }
    };
}

function mainController($scope, $window) {
    
    $scope.numeros = [];
    $scope.numero = 100;
    
    $scope.numeroAlCuadrado = function (numero) {
        return numero * numero;
    };
    
    $scope.agregarNumero = function () {
        var numero = $scope.numero;
        if (numero && $scope.numeros.indexOf(numero) === -1) {
            $scope.numeros.push(numero);
            $scope.numero = null;
        } else {
            $window.alert('Debe escribir un valido y que no exista en la lista.');
        }
    };
    
    $scope.eliminarNumero = function (numero) {
        var index = $scope.numeros.indexOf(numero);
        if (index >= 0) {
            $scope.numeros.splice(index, 1);
        }
    };
    
}

function booksListController($scope, $window, bookService) {
    
    $scope.books = [];
    
    bookService.getAll().done(function (books) {
        
        //Se limpia el arreglo de libros:
        if ($scope.books.length > 0)
            $scope.books.splice(0, $scope.books.length);
        
        for (var i = 0; i < books.results.length; i++) {
            $scope.books.push(books.results[i]);
        }
        
        $scope.$apply();
        
    });
    
    $scope.eliminar = function (book) {
        
        if (!$window.confirm('Seguro que desea eliminar?')) 
            return;
        
        bookService.remove(book).done(function () {
            var index = $scope.books.indexOf(book);
            if (index >= 0) {
                $scope.books.splice(index, 1);
                $scope.$apply();
            }
        });
    };
    
}

function editBookController($scope, $location, $routeParams, bookService) {

    $scope.guardarHabilitado = false;
    
    bookService.get($routeParams.bookId).done(function (book) {
    
        $scope.objectId = book.objectId;
        $scope.title = book.title;
        $scope.author = book.author;
        $scope.description = book.description;
        $scope.year = book.year;
        
        $scope.guardarHabilitado = true;
        
        $scope.$apply();
        
    });
    
    $scope.guardar = function () {
        
        $scope.guardarHabilitado = false;
        
        var book = {
            objectId : $scope.objectId,
            title : $scope.title,
            author : $scope.author,
            description : $scope.description,
            year : $scope.year
        };
        
        bookService.update(book).done(function () {
            $scope.guardarHabilitado = true;
            $location.path('/list');
            $scope.$apply();
        });        
        
    };
    
}

function newBookController($scope, $location, bookService) {
    
    $scope.title = null;
    $scope.author = null;
    $scope.desciption = null;
    $scope.year = (new Date()).getFullYear();
    
    $scope.guardar = function () {
        $scope.guardarHabilitado = false;
        
        var book = {
            objectId : $scope.objectId,
            title : $scope.title,
            author : $scope.author,
            description : $scope.description,
            year : $scope.year
        };
        
        bookService.add(book).done(function () {
            $scope.guardarHabilitado = true;
            $location.path('/list');
            $scope.$apply();
        });
    };
    
}
