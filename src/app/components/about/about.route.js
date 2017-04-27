(function () {
    'use strict';

    angular.module('photocloud')
        .run(run);

    run.$inject = ['routerHelper'];

    function run(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'about',
            config: {
                url: '/about',
                templateUrl: 'app/components/about/about.template.html',
                title: 'About'
            }
        }];
    }
})();
