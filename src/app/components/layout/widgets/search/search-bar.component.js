(function () {
    'use strict';

    angular.module('photocloud')
        .component('searchBar', {
            controller: 'SearchBarController',
            controllerAs: 'vm',
            templateUrl: 'app/components/layout/widgets/search/search.template.html'
        });
})();
