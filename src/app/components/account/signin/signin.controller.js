(function() {
    'use strict';

    angular.module('photocloud')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['accountService'];

    function SignInController(accountService) {
        var vm = this;

        vm.$onInit = function() {

        }
    }
})();