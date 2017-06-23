(function (angular) {
    'use strict';

    angular.module('photocloud')
        .service('commentService', commentService);

    commentService.$inject = ['$q', 'httpService'];

    function commentService($q, httpService) {
        this.getComments = function (postId) {
            var deferred = $q.defer();

            httpService.get('posts/' + postId + '/comments', deferred);

            return deferred.promise;
        };

        this.createComment = function (postId, comment) {
            var deferred = $q.defer();

            httpService.post('posts/' + postId + '/comments', comment, deferred);

            return deferred.promise;
        };

        this.removeComment = function (commentId) {
            var deferred = $q.defer();

            httpService.delete('posts/comments/' + commentId, deferred);

            return deferred.promise;
        };

        this.editComment = function (commentId, comment) {
            var deferred = $q.defer();

            httpService.put('posts/comments/' + commentId, comment, deferred);

            return deferred.promise;
        };
    }
})(angular);
