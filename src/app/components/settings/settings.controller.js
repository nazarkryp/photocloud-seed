(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['settingsService'];

    function SettingsController(settingsService) {
        var vm = this;

        function getAccount() {
            settingsService.getAccount()
                .then(function (response) {
                    vm.settings = response;
                }, function (error) {

                });
        }

        vm.$onInit = function () {
            getAccount();
        };
    }
})(angular);
