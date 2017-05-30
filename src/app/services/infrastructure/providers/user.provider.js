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
                var pictureUri = session.pictureUri ? session.pictureUri : 'assets/images/user.png';

                console.log(session);
                self.currentUser.userId = session.userId;
                self.currentUser.username = session.userName;
                self.currentUser.pictureUri = pictureUri;
                self.currentUser.isActive = session.isActive;
                self.currentUser.isPrivate = session.isPrivate;
                self.currentUser.isAuthenticated = true;
            } else {
                self.currentUser = {};
            }

            return self.currentUser;
        };

        self.setUser = function (session) {
            var pictureUri = (session.pictureUri || session.pictureUri.lenth === 0) ? session.pictureUri : 'assets/images/user.png';

            session.isActive = session.isActive === 'true';
            session.isPrivate = session.isPrivate === 'true';

            self.currentUser.userId = session.userId;
            self.currentUser.username = session.username;
            self.currentUser.pictureUri = pictureUri;
            self.currentUser.isActive = session.isActive;
            self.currentUser.isPrivate = session.isPrivate;
            self.currentUser.isAuthenticated = true;

            sessionStorage.save(session);
        };

        self.logout = function () {
            self.currentUser = {};
            sessionStorage.clear();
        };
    }
})();
