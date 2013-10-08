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
            templateUrl: 'views/new-book.html',
            controller: 'newBookController'
        })
        .otherwise({
            redirectTo: '/'
        });
}

bibliotecaApp.config(['$routeProvider', configurarRutas]);

bibliotecaApp.controller('mainController',      ['$scope', '$window', mainController]);
bibliotecaApp.controller('booksListController', ['$scope', booksListController]);
bibliotecaApp.controller('editBookController',  ['$scope', '$location', '$routeParams', editBookController]);
bibliotecaApp.controller('newBookController',   ['$scope', '$location', newBookController]);
