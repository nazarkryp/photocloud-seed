(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('UserPostsController', UserPostsController);

    UserPostsController.$inject = ['$state', '$stateParams', 'postService', 'user'];

    function UserPostsController($state, $stateParams, postService, user) {
        var vm = this;
        vm.user = {};
        vm.data = {
            posts: [],
            hasMoreItems: false,
            pagination: null
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
        }

        vm.$onInit = function () {
            vm.user = user;

            if (!vm.user.pictureUri || vm.user.pictureUri.length === 0) {
                vm.user.pictureUri = 'assets/images/user.png';
            }

            getUserPosts($stateParams.username);
        };
    }
})(angular);
