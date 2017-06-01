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
            var deferred = $q.defer();

            if (searchQuery) {
                searchBarService.search(searchQuery)
                    .then(function (response) {
                        angular.forEach(response.data, function (user) {
                            if (!user.pictureUri) {
                                user.pictureUri = 'assets/images/user.png';
                            }
                        });

                        deferred.resolve(response.data);
                    });
            } else {
                deferred.resolve([]);
            }

            return deferred.promise;
        };

        vm.selectedItemChange = function (selectedItem) {
            if (selectedItem) {
                $state.go('userposts', {username: selectedItem.username});
                selectedItem = null;
            }
        };
    }
})();
