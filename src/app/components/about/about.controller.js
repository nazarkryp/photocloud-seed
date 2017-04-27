(function () {
    'use strict';

    angular.module('photocloud')
        .controller('AboutController', AboutController);

    function AboutController() {
        var vm = this;

        vm.$onInit = function () {
            console.log('about');
        };
    }
})();
