function mainController($scope) {
    $scope.numero = 100;
    $scope.numeroAlCuadrado = function () {
        return $scope.numero * $scope.numero;
    };
}