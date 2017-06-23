(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('CommentsController', CommentsController);

    CommentsController.$inject = ['commentService'];

    function CommentsController(commentService) {
        var vm = this;

        vm.removeComment = function (index) {
            var comment = vm.post.comments[index];

            commentService.removeComment(comment.id)
                .then(function (response) {
                    vm.post.comments.splice(index, 1);
                }, function (error) {});
        };

        vm.getComments = function () {
            commentService.getComments(vm.post.id)
                .then(onSuccess, onError);
        };

        function onSuccess(comments) {
            vm.post.comments = comments;
        }

        function onError(error) {}
    }
})(angular);
