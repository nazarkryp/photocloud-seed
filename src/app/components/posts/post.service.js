(function () {
    'use strict';

    angular.module('photocloud')
        .service('postService', postService);

    postService.$inject = ['$q', 'httpService'];

    function postService($q, httpService) {
        this.getPosts = function () {
            var deferred = $q.defer();

            httpService.get('posts', deferred);

            return deferred.promise;
        };

        this.getUserPosts = function () {
            var deferred = $q.defer();

            httpService.get('posts/users/', deferred);

            return deferred.promise;
        };
    }
})();
