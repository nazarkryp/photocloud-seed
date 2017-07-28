(function (angular) {
    'use strict';

    angular.module('app.core')
        .factory('environment', environment);

    function environment() {
        var requestUri = 'https://krypapp.azurewebsites.net/api/';
        var authorizeUri = 'https://krypapp.azurewebsites.net/authorize';

        return {
            requestUri: requestUri,
            authorizeUri: authorizeUri
        };
    }
})(angular);
