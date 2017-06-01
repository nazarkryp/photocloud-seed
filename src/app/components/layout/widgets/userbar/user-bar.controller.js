(function () {
    'use strict';

    angular.module('photocloud')
        .controller('UserBarController', UserBarController);

    UserBarController.$inject = ['$scope', '$state', 'userProvider'];

    function UserBarController($scope, $state, userProvider) {
        var vm = this;

        vm.userProvider = userProvider;

        $scope.$watch('vm.userProvider.currentUser', function (currentUser) {
            vm.currentUser = currentUser;
        });

        vm.logout = function () {
            userProvider.logout();
            $state.go('signin');
        };
    }
})();
