(function (angular) {
    'use strict';

    angular.module('photocloud')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        var states = [];

        states.push({
            state: 'posts',
            config: {
                url: '/',
                templateUrl: 'app/components/posts/feed/feed.template.html',
                controller: 'FeedController',
                controllerAs: 'vm',
                title: 'Home'
            }
        });

        states.push({
            state: 'userposts',
            config: {
                url: '/:username',
                templateUrl: 'app/components/posts/user-posts/user-posts.template.html',
                controller: 'UserPostsController',
                controllerAs: 'vm',
                title: 'User'
            }
        });

        states.push({
            state: 'post',
            config: {
                url: '/p/:postId',
                templateUrl: 'app/components/posts/post-details/post-details.template.html',
                controller: 'PostDetailsController',
                controllerAs: 'vm',
                title: 'Post'
            }
        });

        return states;
    }
})(angular);
