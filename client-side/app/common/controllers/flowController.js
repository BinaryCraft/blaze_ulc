'use strict';

(function () {
    var module = angular.module('blaze.flowController', []);

    module.controller('FlowController', function($state) {
        $state.go('home');
    });
})();