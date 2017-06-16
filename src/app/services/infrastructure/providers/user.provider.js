(function () {
    'use strict';

    angular.module('photocloud')
        .service('userProvider', userProvider);

    userProvider.$inject = ['sessionStorage'];

    function userProvider(sessionStorage) {
        var self = this;

        self.updateCurrentUser = function (properties) {
            var session = sessionStorage.get();

            for (var property in properties) {
                session[property] = properties[property];
                self.currentUser[property] = properties[property];
            }

            sessionStorage.save(session);
        };

        self.update = function (key, value) {
            var session = sessionStorage.get();

            session[key] = value;
            self.currentUser[key] = value;

            sessionStorage.save(session);
        };

        self.setCurrentUser = function (session) {
            session.userId = parseInt(session.userId, 10);
            session.isActive = session.isActive === 'true';
            session.isPrivate = session.isPrivate === 'true';
            session.username = session.userName;

            sessionStorage.save(session);

            self.currentUser = getUserFromSession();
        };

        self.logout = function () {
            sessionStorage.clean();

            self.currentUser = getUserFromSession();
        };

        self.currentUser = getUserFromSession();

        function getUserFromSession() {
            var user = sessionStorage.get();

            if (user) {
                var now = new Date();
                var tokenExpirationDate = new Date(user['.expires']);
                var expiresIn = (tokenExpirationDate - now) / 1000 / 60;
                user.isAuthenticated = expiresIn > 0;
            } else {
                user = {
                    isAuthenticated: false
                };
            }

            return user;
        }
    }
})();
