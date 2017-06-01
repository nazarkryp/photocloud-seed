(function () {
    'use strict';

    angular.module('photocloud')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'userProvider'];

    function IndexController($scope, userProvider) {
        var vm = this;

        vm.userProvider = userProvider;

        $scope.$watch('vm.userProvider.currentUser.isAuthenticated', function () {
            vm.currentUser = userProvider.currentUser;
        });

        vm.$onInit = function () {
            vm.currentUser = userProvider.getUser();
        };

        vm.date = new Date();
    }
})();
