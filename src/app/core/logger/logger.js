(function () {
    'use strict';

    'use strict';

    angular.module('app.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', '$mdToast'];

    /* @ngInject */
    function logger($log, $mdToast) {
        var service = {
            showToasts: true,

            error: error,
            info: info,
            success: success,
            warning: warning,
            toast: show,
            log: $log.log
        };

        return service;

        function error(message, data, title) {
            show(message);
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            show(message);
            $log.info('info: ' + message, data);
        }

        function success(message, data, title) {
            show(message);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            show(message);
            $log.warn('Warning: ' + message, data);
        }

        function show(message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position('bottom right')
                .hideDelay(2000)
            );
        }
    }
})();
