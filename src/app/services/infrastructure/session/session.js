(function () {
    'use strict';

    angular.module('photocloud')
        .factory('sessionStorage', sessionStorage);

    sessionStorage.$inject = ['$cookies'];

    function sessionStorage($cookies) {
        var self = {};

        self.key = 'session';

        self.save = function (session) {
            var json = angular.toJson(session);

            $cookies.put(self.key, json);
        };

        self.get = function () {
            var json = $cookies.get(self.key);

            return angular.fromJson(json);
        };

        self.clean = function () {
            $cookies.remove(self.key);
        };

        return {
            save: self.save,
            get: self.get,
            clean: self.clean
        };
    }
})();
