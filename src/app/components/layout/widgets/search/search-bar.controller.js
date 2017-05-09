(function () {
    'use strict';

    angular.module('photocloud')
        .controller('SearchBarController', SearchBarController);

    SearchBarController.$inject = ['$state', '$q', 'searchBarService'];

    function SearchBarController($state, $q, searchBarService) {
        var vm = this;

        vm.noCache = false;
        vm.selectedItem = null;
        vm.query = null;

        vm.search = function (searchQuery) {
            if (searchQuery) {
                return searchBarService.search(searchQuery);
            }

            var deferred = $q.defer();
            deferred.resolve([]);

            return deferred.promise;
        }

        vm.selectedItemChange = function (selectedItem) {
            if (selectedItem) {
                $state.go('userfeed', {
                    username: selectedItem.username
                });
                selectedItem = null;
            }
        }
    }
})();
