(function () {
    'use strict';

    angular.module('photocloud')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [{
            state: 'settings',
            config: {
                url: '/account/edit',
                templateUrl: 'app/components/settings/settings.template.html',
                controller: 'PostsController',
                controllerAs: 'vm',
                title: 'Settings'
            }
        }];
    }
})();
