(function () {
    'use strict';

    angular.module('photocloud')
        .service('accountService', accountService);

    accountService.$inject = ['$q', '$http', 'httpService', 'environment'];

    function accountService($q, $http, httpService, environment) {
        this.create = function (account) {
            var deferred = $q.defer();

            httpService.post('account', account, deferred);

            return deferred.promise;
        };

        this.getAccount = function () {
            var deferred = $q.defer();

            httpService.get('account', deferred);

            return deferred.promise;
        };

        this.signIn = function (account) {
            var deferred = $q.defer();

            var data = 'grant_type=password&username=' + account.username + '&password=' + account.password;
            $http.post(environment.authorizeUri, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        this.updateAccount = function (properties) {
            var deferred = $q.defer();

            httpService.patch('account', properties, deferred);

            return deferred.promise;
        };

        this.changePassword = function (password) {
            var deferred = $q.defer();

            httpService.put('account', password, deferred);

            return deferred.promise;
        };
    }
})();
