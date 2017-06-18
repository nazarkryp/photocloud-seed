(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('PostController', PostController);

    PostController.$inject = ['$state', '$stateParams', 'userProvider', 'postService', 'commentService', 'clipboard', 'logger'];

    function PostController($state, $stateParams, userProvider, postService, commentService, clipboard, logger) {
        var vm = this;

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

        vm.share = function () {
            var pathArray = location.href.split('/');
            var protocol = pathArray[0];
            var host = pathArray[2];

            var link = protocol + '//' + host + '/#!/p/' + vm.post.id;

            clipboard.setText(link);

            logger.toast('Copied to clipboard');
        };

        vm.like = function () {
            if (vm.post.userHasLiked) {
                vm.post.likesCount--;
                vm.post.userHasLiked = !vm.post.userHasLiked;
            } else {
                vm.post.likesCount++;
                vm.post.userHasLiked = !vm.post.userHasLiked;
            }

            // postService.likePost(postId)
            //     .then(function (response) {

            //     }, function (error) {});
        };

        vm.getComments = function () {
            commentService.getComments(vm.postId)
                .then(function (response) {
                    vm.post.comments = response;
                }, function (error) {
                    logger.toast('Error during loading comments');
                });
        };

        vm.$onInit = function () {
            if (vm.post && vm.post.attachments.length > 0) {
                vm.post.activeAttachment = 0;
            }

            vm.currentUser = userProvider.currentUser;
        };
    }
})(angular);
