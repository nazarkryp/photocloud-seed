(function () {
    'use strict';

    angular.module('photocloud')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['accountService', 'session'];

    function SignInController(accountService, session) {
        var vm = this;

        vm.isLoading = false;

        vm.signIn = function (account) {
            accountService.signIn(account)
                .then(function (response) {
                    vm.isLoading = false;

                    session.set(response);
                }, function (error) {
                    vm.isLoading = false;
                });
        };
    }
})();
