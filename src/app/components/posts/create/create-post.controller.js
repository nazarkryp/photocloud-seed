(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['Upload', 'environment', 'postService'];

    function CreatePostController($upload, environment, postService) {
        var vm = this;

        vm.post = {
            attachments: [],
            attachmentIds: [],
            caption: '',
            success: false
        };

        vm.setPreview = function (attachment) {
            vm.post.preview = attachment.uri;
        };

        vm.upload = function (attachment) {
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

                    vm.post.attachments.push(data);
                    if (vm.post.attachments.length === 1) {
                        vm.post.preview = data.uri;
                    }

                    vm.post.attachmentIds = vm.post.attachments.map(function (attachment) {
                        return attachment.id;
                    });
                })
                .error(function (data, status, headers, config) {
                    vm.isUploading = false;
                });
        };

        vm.createPost = function () {
            postService.createPost(vm.post)
                .then(function (response) {
                    console.log('success');
                    console.log(response);
                }, function (error) {
                    console.log('ERROR');
                    console.log(error);
                });
        };

        vm.$onInit = function () {
            console.log('create post attachments');
            console.log(vm.post.attachments);
        };
    }
})(angular);
