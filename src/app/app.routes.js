(function () {
    'use strict';

    angular.module('photocloud')
        .config(configRoutes);

    configRoutes.$inject = ['$httpProvider', '$mdThemingProvider'];

    function configRoutes($httpProvider, $mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue');

        $httpProvider.interceptors.push('httpInterceptor');
    }
})();
