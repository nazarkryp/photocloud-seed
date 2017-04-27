(function () {
    'use strict';

    angular.module('photocloud')
        .run(run);

    run.$inject = ['$rootScope', '$state', 'session'];

    function run($rootScope, $state, session) {
        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeStart(event, next) {
            // var sessionInfo = session.getSession();

            // if (sessionInfo && sessionInfo.isAuthenticated) {
            //     if (next.url !== '/settings' && !sessionInfo.isActive) {
            //         $state.go('settings', {
            //             isRedirected: true
            //         });
            //         event.preventDefault();
            //     } else if (next.url === '/signin' || next.url === '/signup') {
            //         $state.go('feed');
            //         event.preventDefault();
            //     }
            // } else if (next.url !== '/signin' && next.url === '/') {
            //     $state.go('signin');
            //     event.preventDefault();
            // }
        }
    }
})();
