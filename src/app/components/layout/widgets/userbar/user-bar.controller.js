(function () {
    'use strict';

    angular.module('photocloud')
        .controller('UserBarController', UserBarController);

    UserBarController.$inject = ['$scope', '$state', 'userProvider'];

    function UserBarController($scope, $state, userProvider) {
        var vm = this;

        vm.currentUser = {};

        vm.$onInit = function () {
            vm.currentUser = userProvider.getUser();
        };

        vm.logout = function () {
            userProvider.logout();
            $state.go('signin');
        };
    }
})();
