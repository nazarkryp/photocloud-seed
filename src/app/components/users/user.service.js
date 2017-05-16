(function (angular) {
    'use strict';

    angular.module('photocloud')
        .service('userService', userService);

    userService.$inject = ['$q', 'httpService'];

    function userService($q, httpService) {
        this.getUser = function (username) {
            var deferred = $q.defer();

            httpService.get('users/' + username, deferred);

            return deferred.promise;
        };
    }
})(angular);
