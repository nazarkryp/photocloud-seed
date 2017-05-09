(function () {
    'use strict';

    angular.module('photocloud')
        .component('userBar', {
            controller: 'UserBarController',
            controllerAs: 'vm',
            templateUrl: 'app/components/layout/widgets/userbar/user-bar.template.html',
        });
})();
