(function() {
    'use strict';

    angular.module('photocloud')
        .service('postService', postService);

    postService.$inject = ['$q', 'httpService'];

    function postService($q, httpService) {

    }
})();