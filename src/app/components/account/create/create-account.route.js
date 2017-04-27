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
            state: 'signup',
            config: {
                url: '/account/create',
                templateUrl: 'app/components/account/create/create-account.template.html',
                controller: 'CreateAccountController',
                controllerAs: 'vm',
                title: 'Create Account'
            }
        }];
    }
})();
