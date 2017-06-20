(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('PostDetailsController', PostDetailsController);

    PostDetailsController.$inject = ['$state', '$stateParams', 'postService'];

    function PostDetailsController($state, $stateParams, postService) {
        var vm = this;

        vm.post = {};

        vm.next = function () {
            var count = vm.post.attachments.length;

            if (count > 1 && vm.post.activeAttachment !== count - 1) {
                vm.post.activeAttachment++;
            }
        };

        vm.previous = function () {
            var count = vm.post.attachments.length;

            if (count > 1 && vm.post.activeAttachment !== 0) {
                vm.post.activeAttachment--;
            }
        };

        function onSuccess(response) {
            vm.post = response;

            if (vm.post && vm.post.attachments.length > 0) {
                vm.post.activeAttachment = 0;
            }
        }

        function onError(error) {
            if (error.status === 404) {
                $state.go('404');
            }
        }

        vm.$onInit = function () {
            postService.getPostById($stateParams.postId)
                .then(onSuccess, onError);
        };
    }
})(angular);
