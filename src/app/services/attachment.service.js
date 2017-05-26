(function (angular) {
    'use strict';

    angular.module('photocloud')
        .service('attachmentService', attachmentService);

    attachmentService.$inject = ['environment', 'Upload'];

    function attachmentService($upload) {
        this.upload = function (environment, attachment) {
            $upload.upload({
                url: environment.requestUri + 'attachments',
                data: {
                    file: attachment
                }
            });
        };
    }
})(angular);
