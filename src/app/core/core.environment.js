(function (angular) {
    'use strict';

    angular.module('app.core')
        .factory('environment', environment);

    function environment() {
        var requestUri = 'https://krypapp.azurewebsites.net/';

        return {
            requestUri: requestUri
        };
    }
})(angular);
