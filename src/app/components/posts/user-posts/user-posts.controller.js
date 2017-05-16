(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('UserPostsController', UserPostsController);

    UserPostsController.$inject = ['$state', '$stateParams', 'postService', 'userService'];

    function UserPostsController($state, $stateParams, postService, userService) {
        var vm = this;
        vm.user = {};

        function getUser(username) {
            userService.getUser(username)
                .then(function (response) {
                    vm.user = response;
                }, function (error) {

                });
        }

        function getUserPosts(username) {

        }

        vm.$onInit = function () {
            getUser($stateParams.username);
        };
    }
})(angular);
