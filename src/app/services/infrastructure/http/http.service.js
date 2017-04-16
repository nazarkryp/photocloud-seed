(function() {
    'use strict';

    angular.module('photocloud')
        .service('httpService', httpService);

    httpService.$inject = ['$http', 'httpConfiguration'];

    function httpService($http, httpConfiguration) {
        this.get = function(url, deferred) {
            $http.get(httpConfiguration.baseUri + url)
                .then(
                    function onSuccess(response) {
                        deferred.resolve(response);
                    },
                    function onError(error) {
                        deferred.reject(error);
                    }
                );
        }
    }
})();