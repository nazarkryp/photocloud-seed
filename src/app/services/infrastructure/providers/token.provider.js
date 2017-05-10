(function () {
    'use strict';

    angular.module('photocloud')
        .service('tokenProvider', tokenProvider);

    tokenProvider.$inject = ['session'];

    function tokenProvider(session) {
        var refreshTimeout = 5;

        this.getAccessToken = function () {
            var accessToken = session.get();

            if (accessToken) {
                var tokenExpirationData = new Date(accessToken['.expires']);
                var now = new Date();
                var expiresIn = (tokenExpirationData - now) / 1000 / 60;
                var useRefreshToken = accessToken.refresh_token && expiresIn <= refreshTimeout;
                accessToken.useRefreshToken = useRefreshToken;
            }

            return accessToken;
        };
    }
})();
