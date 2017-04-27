(function () {
    'use strict';

    angular.module('photocloud')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'signin',
            config: {
                url: '/signin',
                templateUrl: 'app/components/account/signin/signin.template.html',
                controller: 'SignInController',
                controllerAs: 'vm',
                title: 'Sign In'
            }
        }];
    }
})();
