(function () {
    'use strict';

    angular.module('photocloud')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['postService', '$mdDialog'];

    function PostsController(postService, $mdDialog) {
        var vm = this;

        vm.data = {
            pagination: {
                next: null,
                previous: null
            },
            posts: [],
            hasMoreItems: false
        };

        vm.isLoading = false;

        vm.createPost = function (event) {
            $mdDialog.show({
                controller: 'CreatePostController',
                controllerAs: 'vm',
                templateUrl: 'app/components/posts/create/create-post.template.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        };

        vm.removePost = function (index) {
            var post = vm.data.posts[index];

            if (post.id) {
                postService.remove(post.id).then(
                    function (response) {
                        vm.feed.items.splice(index, 1);
                    });
            }
        };

        function getPosts() {
            vm.isLoading = true;

            postService.getPosts()
                .then(function (response) {
                    vm.data.pagination = response.pagination;
                    angular.forEach(response.data, function (post) {
                        if (!post.user.pictureUri) {
                            post.user.pictureUri = 'assets/images/user.png';
                        }
                    });

                    vm.data.posts = response.data;

                    vm.data.hasMoreItems = response.hasMoreItems;

                    vm.isLoading = false;
                }, function (error) {
                    vm.isLoading = false;
                });
        }

        vm.$onInit = function () {
            getPosts();
        };
    }
})();
