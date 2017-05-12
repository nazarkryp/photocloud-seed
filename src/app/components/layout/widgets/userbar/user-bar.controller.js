(function () {
    'use strict';

    angular.module('photocloud')
        .controller('UserBarController', UserBarController);

    UserBarController.$inject = ['$scope', '$state', 'userProvider'];

    function UserBarController($scope, $state, userProvider) {
        var vm = this;

        vm.userProvider = userProvider;

        $scope.$watch('vm.userProvider.currentUser.isAuthenticated', function (isAuthenticated) {
            vm.currentUser.isAuthenticated = isAuthenticated;
        });

        vm.$onInit = function () {
            vm.currentUser = userProvider.currentUser;
        };

        vm.logout = function () {
            userProvider.logout();
            $state.go('signin');
        };
    }
})();
