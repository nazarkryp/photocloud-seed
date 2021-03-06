(function () {
    'use strict';

    angular.module('photocloud')
        .run(run);

    run.$inject = ['$rootScope', '$state', 'tokenProvider'];

    function run($rootScope, $state, tokenProvider) {
        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeStart(event, next) {
            var accessToken = tokenProvider.getAccessToken();

            if (accessToken && accessToken.isValid) {
                if (next.url !== '/account/edit' && !accessToken.isActive) {
                    $state.go('settings', {
                        isRedirected: true
                    });
                    event.preventDefault();
                } else if (next.url === '/signin' || next.url === '/account/create') {
                    $state.go('posts');
                    event.preventDefault();
                }
            } else if (next.url !== '/signin' && next.url === '/') {
                $state.go('signin');
                event.preventDefault();
            }
        }
    }
})();
