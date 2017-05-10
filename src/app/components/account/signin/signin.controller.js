(function () {
    'use strict';

    angular.module('photocloud')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['accountService', 'session', 'logger'];

    function SignInController(accountService, session, logger) {
        var vm = this;

        vm.isLoading = false;
        vm.error = false;

        vm.signIn = function (account) {
            accountService.signIn(account)
                .then(onSuccess, onError);
        };

        function onSuccess(response) {
            vm.isLoading = false;
            session.save(response);

            var message = 'Logged in as ' + response.userName;

            logger.toast(message);
        }

        function onError(error) {
            vm.isLoading = false;
            logger.toast(error);
        }
    }
})();
