(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('UserPostsController', UserPostsController);

    UserPostsController.$inject = ['$state', '$stateParams', 'postService'];

    function UserPostsController($state, $stateParams, postService) {
        var vm = this;

        function getUser(username) {

        }

        function getUserPosts(username) {

        }

        vm.$onInit = function () {
            vm.username = $stateParams.username;
        };
    }
})(angular);
