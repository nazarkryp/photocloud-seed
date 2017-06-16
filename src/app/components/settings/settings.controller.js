(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Upload', 'accountService', 'userProvider', 'logger', 'environment'];

    function SettingsController($upload, accountService, userProvider, logger, environment) {
        var vm = this;

        vm.changePassword = function () {
            var account = {
                oldPassword: vm.account.oldPassword,
                newPassword: vm.account.newPassword
            };

            accountService.changePassword(account)
                .then(function () {
                    logger.toast('Password successfuly changed.');
                }, function (error) {
                    logger.toast(error);
                });
        };

        vm.updateProfilePicture = function (attachment) {
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
                    var attachment = {
                        pictureId: data.id
                    };

                    accountService.updateAccount(attachment)
                        .then(function (response) {
                            vm.account.pictureId = data.id;
                            vm.account.pictureUri = data.uri;
                            userProvider.update('pictureId', data.id);
                            userProvider.update('pictureUri', data.uri);
                        }, function (error) {
                            console.log(error);
                        });
                })
                .error(function (error, status, headers, config) {
                    logger.toast(error);
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

                    userProvider.updateCurrentUser(response);
                }, function (error) {
                });
        };

        vm.changeAccountPrivacy = function () {
            var account = {
                isPrivate: vm.account.isPrivate
            };

            accountService.updateAccount(account)
                .then(function (response) {
                    vm.account.isPrivate = response.isPrivate;
                    userProvider.update('isPrivate', response.isPrivate);
                }, function (error) {
                });
        };

        vm.invertAccountStatus = function () {
            var account = {
                isActive: !vm.account.isActive
            };

            accountService.updateAccount(account)
                .then(function (response) {
                    vm.account.isActive = response.isActive;
                    userProvider.update('isActive', response.isActive);
                    logger.toast('Account ' + (response.isActive ? 'activated' : 'deactivated'));
                }, function (error) {
                });
        };

        vm.$onInit = function () {
            accountService.getAccount()
                .then(function (response) {
                    vm.account = response;
                }, function (error) {
                });
        };
    }
})(angular);
