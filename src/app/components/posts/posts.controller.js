(function () {
    'use strict';

    angular.module('photocloud')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['postService'];

    function PostsController(postService) {
        var vm = this;

        vm.data = {
            posts: [],
            offset: 1
        };

        vm.isLoading = false;

        function getPosts() {
            vm.isLoading = true;

            postService.getPosts()
                .then(function (response) {
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
