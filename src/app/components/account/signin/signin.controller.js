(function () {
    'use strict';

    angular.module('photocloud')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$state', 'accountService', 'userProvider', 'logger'];

    function SignInController($state, accountService, userProvider, logger) {
        var vm = this;

        vm.isLoading = false;
        vm.error = false;

        vm.signIn = function (account) {
            vm.isLoading = true;
            vm.error = false;
            accountService.signIn(account)
                .then(onAuthorizationSuccess, onAuthenticationError);
        };

        function onAuthorizationSuccess(response) {
            vm.isLoading = false;

            userProvider.setUser(response);
            var currentUser = userProvider.getUser();

            var message = 'Logged in as ' + currentUser.username;
            logger.toast(message);

            $state.go('posts');
        }

        function onAuthenticationError(error) {
            vm.isLoading = false;
            vm.error = true;

            logger.toast(error);
        }
    }
})();
