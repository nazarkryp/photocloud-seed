(function () {
    'use strict';

    angular.module('photocloud')
        .controller('IndexController', IndexController);

    function IndexController() {
        var vm = this;

        vm.date = new Date();
    }
})();
