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