(function () {
    'use strict';

    angular.module('photocloud')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'userProvider'];

    function IndexController($scope, userProvider) {
        var vm = this;

        vm.userProvider = userProvider;

        $scope.$watch('vm.userProvider.currentUser', function (currentUser) {
            vm.currentUser = currentUser;

            console.log(currentUser);
        });

        vm.date = new Date();
    }
})();
