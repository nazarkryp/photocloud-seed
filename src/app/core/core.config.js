(function () {
    'use strict';

    angular.module('app.core')
        .config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider'];

    function configure($logProvider, routerHelperProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        routerHelperProvider.configure({
            docTitle: 'PhotoCloud :'
        });
    }
})();
