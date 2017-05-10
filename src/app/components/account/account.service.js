(function () {
    'use strict';

    angular.module('photocloud')
        .service('accountService', accountService);

    accountService.$inject = ['$q', 'httpService'];

    function accountService($q, httpService) {
        this.create = function (account) {
            var deferred = $q.defer();

            httpService.post('account/create', account, deferred);

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
    }
})();
