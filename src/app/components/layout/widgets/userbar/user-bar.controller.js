(function () {
    'use strict';

    angular.module('photocloud')
        .controller('UserBarController', UserBarController);

    UserBarController.$inject = ['$scope', '$state', 'userProvider', 'session'];

    function UserBarController($scope, $state, userProvider, session) {
        var vm = this;

        vm.$onInit = function () {
            vm.currentUser = userProvider.currentUser;

            console.log(vm.currentUser);
        };

        vm.logout = function () {
            console.log('logout');
            session.clear();
            $state.go('signin');
        };
    }
})();
