(function () {
    'use strict';

    angular.module('photocloud')
        .service('accountService', accountService);

    accountService.$inject = ['$q', 'httpService'];

    function accountService($q, httpService) {
        this.create = function (account) {
            var deferred = $q.defer();

            httpService.post('account/create', account);

            return deferred.promise;
        };

        this.getAccount = function () {
            var deferred = $q.defer();

            httpService.get('account');

            return deferred.promise;
        };

        this.signIn = function (account) {
            var deferred = $q.defer();

            httpService.post('authorize', account);

            return deferred.promise;
        };

        this.changePassword = function (account) {
            var deferred = $q.defer();

            httpService.post('account/password', account);

            return deferred.promise;
        };

        this.changeEmail = function (account) {
            var deferred = $q.defer();

            httpService.post('account/email', account);

            return deferred.promise;
        };

        this.changeProfile = function (account) {
            var deferred = $q.defer();

            httpService.post('account/profile', account);

            return deferred.promise;
        };
    }
})();
