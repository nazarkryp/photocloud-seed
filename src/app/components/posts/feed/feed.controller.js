(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['postService', '$mdDialog'];

    function FeedController(postService, $mdDialog) {
        var vm = this;

        vm.isLoading = false;

        vm.data = {
            pagination: {
                next: null,
                previous: null
            },
            posts: [],
            hasMoreItems: false
        };

        vm.createPost = function (event) {
            $mdDialog.show({
                controller: 'CreatePostController',
                controllerAs: 'vm',
                templateUrl: 'app/components/posts/create/create-post.template.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            }).then(onPostCreated, onPostCreateError);
        };

        function onPostCreated(post) {
            if (!vm.data.posts) {
                vm.data.posts = [];
            }

            vm.data.posts.unshift(post);
        }

        function onPostCreateError() {
        }

        vm.removePost = function (index) {
            var post = vm.data.posts[index];

            if (post.id) {
                vm.data.posts.splice(index, 1);

                postService.remove(post.id).then(
                    function (response) {
                    });
            }
        };

        vm.getPosts = function () {
            vm.isLoading = true;

            postService.getPosts(vm.data.pagination)
                .then(function (response) {
                    if (response.data) {
                        vm.data.posts = vm.data.posts.concat(response.data);
                    }

                    vm.data.pagination = response.pagination;
                    vm.data.hasMoreItems = response.hasMoreItems;
                    vm.isLoading = false;
                }, function (error) {
                    vm.isLoading = false;
                });
        };

        vm.$onInit = function () {
            vm.getPosts();
        };
    }
})(angular);
