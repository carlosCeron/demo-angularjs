var bibliotecaApp = angular.module('bibliotecaApp', []);


function configurarRutas($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'mainController'
        })
        .when('/list', {
            templateUrl: 'views/books-list.html',
            controller: 'booksListController'
        })
        .when('/edit/:bookId', {
            templateUrl: 'views/edit-book.html',
            controller: 'editBookController'})
        .when('/new', {
            templateUrl: 'views/edit-book.html',
            controller: 'newBookController'
        })
        .otherwise({
            redirectTo: '/'
        });
}

bibliotecaApp.config(['$routeProvider', configurarRutas]);

bibliotecaApp.factory('bookService', [bookService]);

bibliotecaApp.controller('mainController',      ['$scope', '$window', mainController]);
bibliotecaApp.controller('booksListController', ['$scope', '$window', 'bookService', booksListController]);
bibliotecaApp.controller('editBookController',  ['$scope', '$location', '$routeParams', 'bookService', editBookController]);
bibliotecaApp.controller('newBookController',   ['$scope', '$location', 'bookService', newBookController]);
