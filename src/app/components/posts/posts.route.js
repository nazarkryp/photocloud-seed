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
            state: 'posts',
            config: {
                url: '/',
                templateUrl: 'app/components/posts/posts.template.html',
                controller: 'PostsController',
                controllerAs: 'vm',
                title: 'Home'
            }
        }];
    }
})();
