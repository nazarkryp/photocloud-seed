(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('PostDetailsController', PostDetailsController);

    PostDetailsController.$inject = ['$state', '$stateParams', 'postService'];

    function PostDetailsController($state, $stateParams, postService) {
        var vm = this;

        vm.post = {};

        function getPost(id) {
            postService.getPostById(id)
                .then(onSuccess, onError);
        }

        function onSuccess(response) {
            vm.post = response;
        }

        function onError(error) {
            vm.error = error;
        }

        vm.$onInit = function () {
            console.log($stateParams.postId);
            getPost($stateParams.postId);
        };
    }
})(angular);
