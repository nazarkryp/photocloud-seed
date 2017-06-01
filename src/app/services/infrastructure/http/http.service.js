(function () {
    'use strict';

    angular.module('photocloud')
        .service('httpService', httpService);

    httpService.$inject = ['$http', 'environment'];

    function httpService($http, environment) {
        this.get = function (url, deferred) {
            $http.get(environment.requestUri + url)
                .then(onSuccess, onError);

            function onSuccess(response) {
                deferred.resolve(response.data);
            }

            function onError(error) {
                deferred.reject(error);
            }
        };

        this.post = function (url, data, deferred) {
            $http.post(environment.requestUri + url, data)
                .then(onSuccess, onError);

            function onSuccess(response) {
                deferred.resolve(response.data);
            }

            function onError(error) {
                deferred.reject(error);
            }
        };

        this.put = function (url, data, deferred) {
            $http.put(environment.requestUri + url, data)
                .then(onSuccess, onError);

            function onSuccess(response) {
                deferred.resolve(response.data);
            }

            function onError(error) {
                deferred.reject(error);
            }
        };

        this.delete = function (url, deferred) {
            $http.delete(environment.requestUri + url)
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
