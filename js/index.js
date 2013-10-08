var repo = repository();

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

function booksListController($scope) {
    
    $scope.books = repo.getAll();
    
    $scope.eliminar = function (book) {
        repo.remove(book);
    };
    
}

function editBookController($scope, $location, $routeParams) {
    
    var book = repo.get($routeParams.bookId);
    
    $scope.title = book.title;
    $scope.author = book.author;
    $scope.description = book.description;
    $scope.year = book.year;
    
    $scope.guardar = function () {
        
        book.title = $scope.title;
        book.author = $scope.author;
        book.description = $scope.description;
        book.year = $scope.year;
        $location.path('/list');
    };
    
}

function newBookController($scope, $location) {
    
    $scope.title = null;
    $scope.author = null;
    $scope.desciption = null;
    $scope.year = (new Date()).getFullYear();
    
    $scope.guardar = function () {
        repo.add($scope.title, $scope.author, $scope.description, $scope.year);
        $location.path('/list');
    };
    
}
