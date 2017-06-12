(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Upload', 'settingsService', 'environment'];

    function SettingsController($upload, settingsService, environment) {
        var vm = this;

        vm.account = {};

        function getAccount() {
            settingsService.getAccount()
                .then(function (response) {
                    vm.settings = response;
                }, function (error) {

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
                    vm.upload.progress = Math.round((e.loaded * 100.0) / e.total);
                })
                .success(function (data, status, headers, config) {
                    vm.isUploading = false;

                    vm.account.pictureId = data.pictureId;
                    vm.account.pictureUri = data.pictureUri;

                    var attachment = {
                        attachmentId: data.pictureId
                    };

                    settingsService.setAccountProfilePicture(attachment)
                        .then(function (response) {
                            vm.account.pictureId = data.pictureId;
                            vm.account.pictureUri = data.pictureUri;
                        }, function (error) {
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
