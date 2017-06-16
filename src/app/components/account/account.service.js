(function () {
    'use strict';

    angular.module('photocloud')
        .service('accountService', accountService);

    accountService.$inject = ['$q', 'httpService'];

    function accountService($q, httpService) {
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
            httpService.post('authorize', data, deferred);

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
