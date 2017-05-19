(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('UserPostsController', UserPostsController);

    UserPostsController.$inject = ['$state', '$stateParams', 'postService', 'userService'];

    function UserPostsController($state, $stateParams, postService, userService) {
        var vm = this;
        vm.user = {};
        vm.data = {
            posts: [],
            hasMoreItems: false,
            pagination: null
        };

        function getUser(username) {
            userService.getUser(username)
                .then(function (response) {
                    vm.user = response;
                }, function (error) {

                });
        }

        function getUserPosts(username) {
            postService.getUserPosts(username)
                .then(onSuccess, onError);
        }

        function onSuccess(response) {
            vm.data.posts = response.data;
            console.log(vm.data.posts);
            vm.data.pagination = response.pagination;
            vm.data.hasMoreItems = response.hasMoreItems;
        }

        function onError(error) {
        }

        vm.$onInit = function () {
            getUser($stateParams.username);
            getUserPosts($stateParams.username);
        };
    }
})(angular);
