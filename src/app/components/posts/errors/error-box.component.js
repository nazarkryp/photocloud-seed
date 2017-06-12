(function (angular) {
    'use strict';

    angular.module('photocloud')
        .component('errorBox', {
            controller: 'ErrorBoxController',
            controllerAs: 'vm',
            templateUrl: 'app/components/posts/errors/error-box.template.html',
            bindings: {
                error: '='
            }
        });
})(angular);
