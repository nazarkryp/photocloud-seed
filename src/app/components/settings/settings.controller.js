(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Upload', 'settingsService', 'environment'];

    function SettingsController($upload, settingsService, environment) {
        var vm = this;

        vm.account = {};

        function getAccount() {
            vm.isLoading = true;
            settingsService.getAccount()
                .then(function (response) {
                    vm.account = response;
                    vm.isLoading = false;
                }, function (error) {
                    vm.isLoading = false;
                });
        }

        vm.changePassword = function () {};

        vm.updateProfilePicture = function (attachment) {
            vm.isUploading = true;

            $upload.upload({
                    url: environment.requestUri + 'attachments',
                    data: {
                        file: attachment
                    }
                })
                .progress(function (e) {
                    vm.progress = Math.round((e.loaded * 100.0) / e.total);
                })
                .success(function (data, status, headers, config) {
                    vm.account.pictureId = data.id;
                    vm.account.pictureUri = data.uri;

                    var attachment = {
                        attachmentId: data.id
                    };

                    settingsService.setAccountProfilePicture(attachment)
                        .then(function (response) {
                            vm.account.pictureId = data.id;
                            vm.account.pictureUri = data.uri;
                            vm.isUploading = false;
                        }, function (error) {
                            vm.isUploading = false;
                        });
                })
                .error(function (data, status, headers, config) {
                    vm.isUploading = false;
                });

            function onProfilePictureChanged(response) {}
        };

        vm.$onInit = function () {
            getAccount();
        };
    }
})(angular);
