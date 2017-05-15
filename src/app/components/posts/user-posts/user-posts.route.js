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
            state: 'userposts',
            config: {
                url: '/posts/:username',
                templateUrl: 'app/components/posts/user-posts/user-posts.template.html',
                controller: 'UserPostsController',
                controllerAs: 'vm',
                title: 'User'
            }
        }];
    }
})();
