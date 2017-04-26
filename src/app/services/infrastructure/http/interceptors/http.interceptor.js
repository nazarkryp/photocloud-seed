(function() {
    'use strict';

    angular.module('photocloud')
        .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', 'session'];

    function httpInterceptor($q, session) {
        return {
            'request': function(config) {
                var sessionInfo = session.getSession();

                if (sessionInfo) {
                    config.headers.Authorization = 'Bearer ' + sessionInfo.token;
                }

                config.headers.Authorization = 'Bearer lJPy1rZGULhhXPuTrWtE0RbAE4GSU_uHxxWGYGbIdmv7IwgycRu7Dtojc6-aSaYyKK-pz14vy0hIvng1u9EiWLTcfkXvIE8ZTc8aDL6dDgj9qq0ai9GBaDZ5b-4XWOIAGYUZE62KLlb8hbfv-CLbyv7MuNamXjJc9rTnDSLMxC2K0T_sVoZPaf4REmx1KNZOONVOAvRDQSzOtd9hWHOK7qQq_rqBmEPXbfqCveN478PzQmdd6wKxwIGAuNbgY6PRSBVWm9p2c7hEgonJ1xqtkQiMLSsEwlnwu2Zi0ii_SWOoJYBUJVSj7mRK3U4EbJ8PKwkDyMa_n4TcJS8ScG0-OMU_m3R3IQeygoWbRhmRbh_UgXXKBN9BRIor4iVO7p5zhSamLxLBY4f-OcwLWbAJwQ';

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