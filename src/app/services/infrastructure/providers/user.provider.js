(function () {
    'use strict';

    angular.module('photocloud')
        .service('userProvider', userProvider);

    userProvider.$inject = ['sessionStorage'];

    function userProvider(sessionStorage) {
        this.setCurrentUser = function (session) {
            session.userId = parseInt(session.userId, 10);
            session.isActive = session.isActive === 'true';
            session.isPrivate = session.isPrivate === 'true';
            session.username = session.userName;

            sessionStorage.save(session);

            this.currentUser = getUserFromSession();
        };

        this.logout = function () {
            sessionStorage.clean();

            this.currentUser = getUserFromSession();
        };

        this.currentUser = getUserFromSession();

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
