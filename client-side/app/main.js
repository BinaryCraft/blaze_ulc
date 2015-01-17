(function (app) {
    function setupState($stateProvider) {
        var home = {
            templateUrl: 'partials/home',
            controller: 'HomeController'
        };

        var about = {
            templateUrl: 'partials/about',
            controller: 'AboutController'
        };

        var questions = {
            templateUrl: 'partials/questions',
            controller: 'QuestionsController'
        };

        var talks = {
            templateUrl: 'partials/talks',
            controller: 'TalksController'
        };

        $stateProvider
            .state('home', home)
            .state('talks', talks)
            .state('about', about)
            .state('questions', questions)
    }

    app.config(function ($stateProvider) {
        setupState($stateProvider);
    });
})(angular.module('blaze', ['ui.router']));