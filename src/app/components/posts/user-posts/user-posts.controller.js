(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('UserPostsController', UserPostsController);

    UserPostsController.$inject = ['$state', '$stateParams', 'postService', 'userService', 'userProvider'];

    function UserPostsController($state, $stateParams, postService, userService, userProvider) {
        var vm = this;
        vm.user = null;

        vm.data = {
            posts: [],
            hasMoreItems: false,
            pagination: null
        };

        vm.error = {
            title: '',
            details: '',
            display: false
        };

        function getUserPosts(username) {
            postService.getUserPosts(username)
                .then(onSuccess, onError);
        }

        function onSuccess(response) {
            vm.data.posts = response.data;
            vm.data.pagination = response.pagination;
            vm.data.hasMoreItems = response.hasMoreItems;
        }

        function onError(error) {
            vm.error.title = error.data.error.message;
            vm.error.display = true;

            if (!userProvider.currentUser.isAuthenticated) {
                vm.error.details = 'Already follow ' + vm.user.username + '? Log in to see their photos and videos.';
            } else {
                vm.error.details = 'Follow ' + vm.user.username + ' to see their photos and videos.';
            }
        }

        function getUser(username) {
            userService.getUser(username)
                .then(function (response) {
                    vm.user = response;

                    if (!vm.user.pictureUri || vm.user.pictureUri.length === 0) {
                        vm.user.pictureUri = 'assets/images/user.png';
                    }

                    if (vm.user.isActive) {
                        getUserPosts($stateParams.username);
                    } else {
                        vm.error.title = 'Account has been deactivated';
                        vm.error.display = true;
                    }
                });
        }

        vm.$onInit = function () {
            vm.currentUser = userProvider.currentUser;

            getUser($stateParams.username);
        };
    }
})(angular);
