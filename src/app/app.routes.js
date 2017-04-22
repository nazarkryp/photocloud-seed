(function() {
    'use strict';

    angular.module('photocloud')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function configRoutes($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('posts', {
                url: '/',
                templateUrl: 'app/components/posts/posts.template.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/components/about/about.template.html',
                controller: 'AboutController',
                controllerAs: 'vm'
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'app/components/account/signin/signin.template.html',
                controller: 'SignInController',
                controllerAs: 'vm'
            })
            .state('signup', {
                url: '/account/create',
                templateUrl: 'app/components/account/create/create-account.template.html',
                controller: 'CreateAccountController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('httpInterceptor');
    }
})();