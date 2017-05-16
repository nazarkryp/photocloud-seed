(function (angular) {
    'use strict';

    angular.module('photocloud')
        .component('post', {
            controller: 'PostController',
            controllerAs: 'vm',
            templateUrl: 'app/components/posts/post/post.template.html',
            bindings: {
                post: '=',
                removeCallback: '&'
            }
        });
})(angular);
