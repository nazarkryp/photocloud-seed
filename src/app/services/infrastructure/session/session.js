(function () {
    'use strict';

    angular.module('photocloud')
        .factory('session', session);

    session.$inject = ['$cookies'];

    function session($cookies) {
        var self = {};

        self.key = 'session';

        self.save = function (session) {
            session.isActive = session.isActive === 'true';
            session.isPrivate = session.isPrivate === 'true';

            var json = angular.toJson(session);
            $cookies.put(self.key, json);
        };

        self.get = function () {
            var json = $cookies.get(self.key);
            return angular.fromJson(json);
        };

        self.clear = function () {
            $cookies.remove(self.key);
        };

        return {
            save: self.save,
            get: self.get,
            clear: self.clear
        };
    }
})();
