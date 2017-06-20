(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('UserPostsController', UserPostsController);

    UserPostsController.$inject = ['$state', '$stateParams', 'postService', 'userService', 'userProvider'];

    function UserPostsController($state, $stateParams, postService, userService, userProvider) {
        var vm = this;

        vm.data = {
            pagination: {
                next: null,
                previous: null
            },
            posts: [],
            hasMoreItems: false
        };

        vm.getPosts = function () {
            vm.isLoading = true;

            postService.getUserPosts($stateParams.username, vm.data.pagination)
                .then(function (response) {
                    if (response.data) {
                        vm.data.posts = vm.data.posts.concat(response.data);
                    }

                    vm.data.pagination = response.pagination;
                    vm.data.hasMoreItems = response.hasMoreItems;
                    vm.isLoading = false;
                }, function () {
                    vm.isLoading = false;
                });
        };

        function getUser(username) {
            return userService.getUser(username)
                .then(function (response) {
                    vm.user = response;

                    if (vm.user.id === vm.currentUser.userId || !vm.user.isPrivate || (vm.user.isPrivate && vm.user.outgoingStatus === 'Following')) {
                        vm.getPosts();
                    } else if (vm.user.outgoingStatus === 'Requested') {
                        vm.error = {
                            title: 'This account is private',
                            details: 'Please wait until ' + vm.user.username + ' accepts your request'
                        };
                    } else {
                        vm.error = {
                            title: 'This account is private'
                        };

                        if (userProvider.currentUser.isAuthenticated) {
                            vm.error.details = 'Follow ' + vm.user.username + ' to see all their photos.';
                        } else {
                            vm.error.details = 'Already follow ' + vm.user.username + '? Log in to see their photos and videos.';
                        }
                    }
                }, function (error) {
                    if (error.status === 403) {
                        vm.error = {
                            title: 'Account has been deactivated'
                        };
                    } else if (error.status === 404) {
                        $state.go('404');
                    }
                });
        }

        vm.logout = function () {
            userProvider.logout();
            $state.go('signin');
        };

        vm.$onInit = function () {
            vm.currentUser = userProvider.currentUser;
            vm.user = {
                username: $stateParams.username
            };

            getUser($stateParams.username)
                .then(function () {
                    vm.loaded = true;
                });
        };
    }
})(angular);
