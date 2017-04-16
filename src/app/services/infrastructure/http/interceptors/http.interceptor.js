(function() {
    'use strict';

    angular.module('photocloud')
        .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', '$state', 'session'];

    function httpInterceptor($q, $state, session) {
        return {
            'request': function(config) {
                var sessionInfo = session.getSession();

                if (sessionInfo) {
                    config.headers.Authorization = 'Bearer ' + sessionInfo.token;
                }

                return config;
            },
            'requestError': function(rejection) {
                return $q.reject(rejection);
            },
            'response': function(response) {
                return response;
            },
            'responseError': function(rejection) {
                return $q.reject(rejection);
            }
        }
    }
})();