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
            },
            {
                state: 'userposts',
                config: {
                    url: '/:username',
                    templateUrl: 'app/components/posts/user-posts/user-posts.template.html',
                    controller: 'UserPostsController',
                    controllerAs: 'vm',
                    title: 'User'
                }
            },
            {
                state: 'post',
                config: {
                    url: '/p/:postId',
                    templateUrl: 'app/components/posts/post-details/post-details.template.html',
                    controller: 'PostDetailsController',
                    controllerAs: 'vm',
                    title: 'Post'
                }
            }
        ];
    }
})();
