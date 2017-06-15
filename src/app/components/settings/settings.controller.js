(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Upload', 'accountService', 'userProvider', 'environment'];

    function SettingsController($upload, accountService, userProvider, environment) {
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

        function updateCurrentUser(user) {

        }

        vm.changePassword = function () {
            var account = {
                oldPassword: vm.account.oldPassword,
                newPassword: vm.account.newPassword
            };

            accountService.updateAccount(account)
                .then(function (response) {}, function (error) {});
        };

        vm.updateProfilePicture = function (attachment) {
            vm.isUploading = true;

            var upload = {
                url: environment.requestUri + 'attachments',
                data: {
                    file: attachment
                }
            };

            $upload.upload(upload)
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

        vm.updateProfile = function () {
            var account = {
                username: vm.account.username,
                fullName: vm.account.fullName,
                bio: vm.account.bio,
                email: vm.account.email
            };

            accountService.updateAccount(account)
                .then(function (response) {
                    vm.account.username = response.username;
                    vm.account.fullName = response.fullName;
                    vm.account.bio = response.bio;
                    vm.account.email = response.email;
                });
        };

        vm.changeAccountPrivacy = function () {
            var account = {
                isPrivate: vm.account.isPrivate
            };

            accountService.updateAccount(account)
                .then(function (response) {
                    vm.account.isPrivate = response.isPrivate;
                });
        };

        vm.invertAccountStatus = function () {
            var account = {
                isActive: !vm.account.isActive
            };

            accountService.updateAccount(account)
                .then(function (response) {
                    vm.account.isActive = response.isActive;
                });
        };

        vm.$onInit = function () {
            getAccount();
        };
    }
})(angular);
