(function (angular) {
    'use strict';

    angular.module('photocloud')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['Upload', 'environment'];

    function CreatePostController($upload, environment) {
        var vm = this;
        vm.post = {
            attahcments: [],
            attachmentIds: [],
            caption: '',
            success: false
        };

        vm.setCover = function (attachment) {
            vm.preview = attachment.uri;
        };

        vm.upload = function (attachment) {
            vm.upload = {};

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
                    vm.upload.isUploading = false;
                    vm.post.attachments.push(data);
                    vm.post.attachmentIds = vm.post.attachments.map(function (attachment) {
                        return attachment.id;
                    });
                })
                .error(function (data, status, headers, config) {
                    vm.isUploading = false;
                });
        };
    }
})(angular);

// var attachments =
//     {
//         attachments: [
//             {
//                 uri: 'https://scontent-fra3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/14033417_178894212519808_1675329581_n.jpg',
//                 isCover: false
//             },
//             {
//                 uri: 'https://scontent-fra3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14271989_1774841219441905_279848895_n.jpg',
//                 isCover: false
//             },
//             {
//                 uri: 'https://scontent-fra3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/18013390_1327946023951549_1021647375392833536_n.jpg',
//                 isCover: false
//             },
//             {
//                 uri: 'https://scontent-fra3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/10724727_438400359617822_497060306_n.jpg',
//                 isCover: true
//             }
//         ]
//     };
