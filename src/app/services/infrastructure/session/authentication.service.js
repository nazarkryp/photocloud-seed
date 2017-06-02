(function (angular) {
    'use strict';

    angular.module('photocloud')
        .service('authenticationService', authenticationService);

    authenticationService.$inject = ['$q', 'httpService'];

    function authenticationService($q, httpService) {
        this.signIn = function (username, password) {
            var deferred = $q.defer();

            var data = 'grant_type=password&username=' + username + '&password=' + password;
            httpService.post('authorize', data, deferred);

            return deferred.promise;
        };

        this.refreshToken = function (refreshToken) {
            var deferred = $q.defer();

            var data = 'grant_type=refresh_token&refresh_token=' + refreshToken;
            httpService.post('authorize', data, deferred);

            return deferred.promise;
        };
    }
})(angular);
