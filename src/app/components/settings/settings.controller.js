(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Upload', 'accountService', 'environment'];

    function SettingsController($upload, accountService, environment) {
        var vm = this;

        vm.account = {};

        function getAccount() {
            vm.isLoading = true;
            accountService.getAccount()
                .then(function (response) {
                    vm.account = response;
                    vm.isLoading = false;
                }, function (error) {
                    vm.isLoading = false;
                });
        }

        vm.changePassword = function () {
        };

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
                        pictureId: data.id
                    };

                    console.log(attachment);
                    accountService.updateAccount(attachment)
                        .then(function (response) {
                            console.log(response);
                            vm.account.pictureId = data.id;
                            vm.account.pictureUri = data.uri;
                            vm.isUploading = false;
                        }, function (error) {
                            vm.isUploading = false;
                            console.log('error');
                        });
                })
                .error(function (data, status, headers, config) {
                    vm.isUploading = false;
                });
        };

        vm.invertAccountStatus = function () {
            vm.account.isActive = !vm.account.isActive;
            // accountService.invertAccountStatus()
            //     .then(function (response) {
            //
            //     });
        };

        vm.$onInit = function () {
            getAccount();
        };
    }
})(angular);
