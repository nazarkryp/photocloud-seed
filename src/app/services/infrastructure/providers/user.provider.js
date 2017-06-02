(function () {
    'use strict';

    angular.module('photocloud')
        .service('userProvider', userProvider);

    userProvider.$inject = ['sessionStorage'];

    function userProvider(sessionStorage) {
        this.setCurrentUser = function (session) {
            session.userId = parseInt(session.userId, 10);
            session.pictureUri = (session.pictureUri && session.pictureUri.length !== 0) ? session.pictureUri : 'assets/images/user.png';
            session.isActive = session.isActive === 'true';
            session.isPrivate = session.isPrivate === 'true';
            session.username = session.userName;

            sessionStorage.save(session);

            this.currentUser = getUserFromSession();
        };

        this.logout = function () {
            sessionStorage.clear();

            this.currentUser = getUserFromSession();
        };

        this.currentUser = getUserFromSession();

        function getUserFromSession() {
            var user = sessionStorage.get();

            if (user) {
                user.isAuthenticated = true;
            } else {
                user = {
                    isAuthenticated: false
                };
            }

            return user;
        }
    }
})();
