(function (angular) {
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

        this.getPostById = function (postId) {
            var deferred = $q.defer();

            httpService.get('posts/' + postId, deferred);

            return deferred.promise;
        };

        this.getPostByTag = function (tag) {
            var deferred = $q.defer();

            httpService.get('posts/tags/' + tag, deferred);

            return deferred.promise;
        };

        this.getUserPosts = function (username, pagination) {
            var deferred = $q.defer();

            var requestUri = 'posts/users/' + username;

            if (pagination) {
                requestUri = requestUri + '?next=' + pagination.next;
            }

            httpService.get(requestUri, deferred);

            return deferred.promise;
        };

        this.createPost = function (post) {
            var deferred = $q.defer();

            httpService.post('posts/create', post, deferred);

            return deferred.promise;
        };

        this.remove = function (postId) {
            var deferred = $q.defer();

            httpService.delete('posts/remove/' + postId, deferred);

            return deferred.promise;
        };

        this.likePost = function (postId) {
            var deferred = $q.defer();

            httpService.delete('posts/like/' + postId, deferred);

            return deferred.promise;
        };
    }
})(angular);
