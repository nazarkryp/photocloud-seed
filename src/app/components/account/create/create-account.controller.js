(function() {
    'use strict';

    angular.module('photocloud')
        .controller('CreateAccountController', CreateAccountController);

    CreateAccountController.$inject = ['accountService'];

    function CreateAccountController(accountService) {
        var vm = this;

        vm.$onInit = function() {

        }
    }
})();