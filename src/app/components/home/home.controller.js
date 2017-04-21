(function() {
    'use strict';

    angular.module('photocloud')
        .controller('HomeController', HomeController);

    function HomeController() {
        var vm = this;

        vm.$onInit = function() {
            console.log('home');
        }
    }
})();