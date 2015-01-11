(function(app){
    app.controller('mainController', function($scope){
        $scope.randomStuff = ['Apple', 'Car', 'Tooth brush', 'Juice', 'Tennis ball'];
    });
})(angular.module('blaze', []));