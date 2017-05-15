(function () {
    'use strict';

    angular.module('photocloud')
        .controller('CreateAccountController', CreateAccountController);

    CreateAccountController.$inject = ['$state', 'accountService', 'logger'];

    function CreateAccountController($state, accountService, logger) {
        var vm = this;

        vm.create = function (account) {
            vm.isLoading = true;
            vm.errors = [];

            var validationResult = validateUserInput(account);

            if (!validationResult) {
                return;
            }

            accountService.create(account)
                .then(onAccountCreateSuccess, onAccountCreateError);
        };

        function validateUserInput(account) {
            if (!account.username) {
                return false;
            }

            if (!account.password || !account.confirmPassword || account.password !== account.confirmPassword) {
                return false;
            }

            return true;
        }

        function onAccountCreateSuccess() {
            vm.isLoading = false;

            logger.toast('Account has been created. Now you can sign in using your username and password');

            $state.go('signin');
        }

        function onAccountCreateError(errorResponse) {
            vm.isLoading = false;

            vm.errors = errorResponse.data.error.modelState;
        }
    }
})();
