(function (angular) {
    'use strict';

    angular.module('photocloud')
        .service('settingsService', settingsService);

    settingsService.$inject = ['$q', 'httpService'];

    function settingsService($q, httpService) {
        this.getAccount = function () {
            var deferred = $q.defer();

            httpService.get('account', deferred);

            return deferred.promise;
        };
    }
})(angular);
