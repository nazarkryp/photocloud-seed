(function (angular) {
    'use strict';

    angular.module('photocloud')
        .component('comments', {
            controller: 'CommentsController',
            controllerAs: 'vm',
            templateUrl: 'app/components/posts/comments/comments.template.html',
            bindings: {
                post: '='
            }
        });
})(angular);
