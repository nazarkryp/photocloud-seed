(function() {
    'use strict';

    angular.module('photocloud')
        .controller('PostsController', PostsController);

    function PostsController() {
        var vm = this;

        vm.$onInit = function() {
            console.log('home');
        }
    }
})();