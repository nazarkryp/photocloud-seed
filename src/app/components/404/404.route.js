(function (angular) {
    'use strict';

    angular.module('photocloud')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: '404',
            config: {
                templateUrl: 'app/components/404/404.template.html',
                title: 'Page Not Found'
            }
        }];
    }
})(angular);
