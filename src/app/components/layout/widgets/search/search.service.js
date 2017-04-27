(function() {
    'use strict';

    angular.module('photocloud')
        .service('searchBarService', searchBarService);

    searchBarService.$inject = ['$q', 'httpService'];

    function searchBarService($q, httpService) {
        this.search = function(query) {
            var deferred = $q.defer();

            httpService.get('users/search?query=' + query, deferred);

            return deferred.promise;
        };
    }
})();