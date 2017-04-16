(function() {
    'use strict';

    angular.module('photocloud')
        .factory('session', session);

    session.$inject = ['$cookies'];

    function session($cookies) {
        var self = {};

        self.key = 'session';

        self.setSession = function(session) {
            $cookies.put(self.key, session);
        }

        self.getSession = function() {
            return $cookies.get(self.key);
        }

        self.cleanSession = function() {
            $cookies.remove(self.key);
        }

        return {
            setSession: self.setSession,
            getSession: self.getSession,
            cleanSession: self.cleanSession
        }
    }
})();