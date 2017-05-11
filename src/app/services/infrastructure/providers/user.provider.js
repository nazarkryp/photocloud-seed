(function () {
    'use strict';

    angular.module('photocloud')
        .factory('userProvider', userProvider);

    userProvider.$inject = ['tokenProvider'];

    function userProvider(tokenProvider) {
        function getUser() {
            var accessToken = tokenProvider.getAccessToken();

            var pictureUri = accessToken ? accessToken.pictureUri : 'assets/images/user.png';

            return {
                username: accessToken ? accessToken.userName : '',
                pictureUri: pictureUri,
                isActive: accessToken ? accessToken.isActive : false,
                isPrivate: accessToken ? accessToken.isPrivate : false,
                isAuthenticated: accessToken ? accessToken.isValid : false
            };
        }

        return {
            currentUser: getUser()
        };
    }
})();
