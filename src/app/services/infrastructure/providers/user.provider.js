(function () {
    'use strict';

    angular.module('photocloud')
        .service('userProvider', userProvider);

    userProvider.$inject = ['sessionStorage', 'tokenProvider', '$http', '$q', 'environment'];

    function userProvider(sessionStorage, tokenProvider, $http, $q, environment) {
        var self = this;

        self.currentUser = {};

        self.getUser = function () {
            var deferred = $q.defer();
            var accessToken = tokenProvider.getAccessToken();

            if (!accessToken || !accessToken.isValid) {
                self.logout();
                deferred.reject();

                return deferred.promise;
            }

            if (accessToken.useRefreshToken) {
                var data = 'grant_type=refresh_token&refresh_token=' + accessToken.refreshToken;

                $http.post(environment.requestUri + 'authorize', data)
                    .then(function (response) {
                        self.setUser(response);
                        deferred.resolve(self.currentUser);
                    }, function (error) {
                        deferred.reject(error);
                        self.logout();
                    });
            } else {
                setCurrentUser(accessToken);
                deferred.resolve(self.currentUser);
            }

            return deferred.promise;
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
