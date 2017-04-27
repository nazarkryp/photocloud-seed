(function() {
    'use strict';

    angular.module('photocloud')
        .component('search', {
            controller: 'SearchBarController',
            controllerAs: 'vm',
            templateUrl: 'app/components/widgets/search/search.template.html'
        });
})();