(function (angular) {
    'use strict';

    angular.module('photocloud')
        .service('postService', postService);

    postService.$inject = ['$q', 'httpService'];

    function postService($q, httpService) {
        this.getPosts = function (pageFilter) {
            var deferred = $q.defer();

            var requestUri = 'posts';

            if (pageFilter && pageFilter.next) {
                requestUri = requestUri + '?next=' + pageFilter.next;
            }

            httpService.get(requestUri, deferred);

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

        this.getUserPosts = function (username, pageFilter) {
            var deferred = $q.defer();

            var requestUri = 'posts/' + username;

            if (pageFilter && pageFilter.next) {
                requestUri = requestUri + '?next=' + pageFilter.next;
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

            httpService.delete('posts/' + postId, deferred);

            return deferred.promise;
        };

        this.likePost = function (postId) {
            var deferred = $q.defer();

            httpService.delete('posts/like/' + postId, deferred);

            return deferred.promise;
        };
    }
})(angular);
