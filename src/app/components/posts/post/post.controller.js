(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('PostController', PostController);

    PostController.$inject = ['$state', '$stateParams', 'clipboard', 'logger'];

    function PostController($state, $stateParams, clipboard, logger) {
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

        vm.$onInit = function () {
            vm.post.activeAttachment = 0;
        };
    }
})(angular);
