(function () {
    'use strict';

    angular.module('photocloud')
        .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', 'tokenProvider'];

    function httpInterceptor($q, tokenProvider) {
        return {
            request: function (config) {
                var accessToken = tokenProvider.getAccessToken();

                if (accessToken) {
                    config.headers.Authorization = 'Bearer ' + accessToken.token;
                }

                return config;
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                return response;
            },
            responseError: function (rejection) {
                return $q.reject(rejection);
            }
        };
    }
})();
