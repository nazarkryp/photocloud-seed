(function () {
    'use strict';

    angular.module('photocloud')
        .service('userProvider', userProvider);

    userProvider.$inject = ['sessionStorage'];

    function userProvider(sessionStorage) {
        var self = this;

        self.currentUser = {};

        self.getUser = function () {
            var session = sessionStorage.get();

            if (session) {
                self.currentUser = setCurrentUser(session);
            } else {
                self.currentUser = {
                    isAuthenticated: false
                };
            }

            return self.currentUser;
        };

        self.setUser = function (session) {
            session.userId = parseInt(session.userId);
            session.pictureUri = (session.pictureUri || session.pictureUri.lenth === 0) ? session.pictureUri : 'assets/images/user.png';
            session.isActive = session.isActive === 'true';
            session.isPrivate = session.isPrivate === 'true';

            setCurrentUser(session);

            sessionStorage.save(session);
        };

        self.logout = function () {
            self.currentUser = {
                isAuthenticated: false
            };

            sessionStorage.clear();
        };

        function setCurrentUser(session) {
            self.currentUser.userId = session.userId;
            self.currentUser.username = session.userName;
            self.currentUser.pictureUri = session.pictureUri;
            self.currentUser.isActive = session.isActive;
            self.currentUser.isPrivate = session.isPrivate;
            self.currentUser.isAuthenticated = true;

            return self.currentUser;
        }
    }
})();
