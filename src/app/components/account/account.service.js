(function() {
    'use strict';

    angular.module('photocloud')
        .service('accountService', accountService);

    accountService.$inject = ['$q', 'httpService'];

    function accountService($q, httpService) {
        this.getAccount = function() {
            var deferred = $q.defer();

            httpService.get('account');

            return deferred.promise;
        }
    }
})();