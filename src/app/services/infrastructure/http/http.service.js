(function () {
    'use strict';

    angular.module('photocloud')
        .service('httpService', httpService);

    httpService.$inject = ['$http', 'httpConfiguration'];

    function httpService($http, httpConfiguration) {
        this.get = function (url, deferred) {
            $http.get(httpConfiguration.baseUri + url)
                .then(onSuccess, onError);

            function onSuccess(response) {
                deferred.resolve(response.data);
            }

            function onError(error) {
                deferred.reject(error);
            }
        };

        this.post = function (url, data, deferred) {
            $http.post(httpConfiguration.baseUri + url, data)
                .then(onSuccess, onError);

            function onSuccess(response) {
                deferred.resolve(response.data);
            }

            function onError(error) {
                deferred.reject(error);
            }
        };
    }
})();
