(function (angular) {
    'use strict';

    angular.module('app.core')
        .service('clipboard', clipboard);

    clipboard.$inject = ['$window'];

    function clipboard($window) {
        var body = angular.element($window.document.body);

        var textarea = angular.element('<textarea/>');

        textarea.css({
            position: 'fixed',
            opacity: '0'
        });

        this.setText = function (toCopy) {
            textarea.val(toCopy);
            body.append(textarea);
            textarea[0].select();

            try {
                var successful = document.execCommand('copy');

                if (!successful) {
                    throw successful;
                }
            } catch (err) {
                $window.prompt('Copy to clipboard: Ctrl+C, Enter', toCopy);
            }

            textarea.remove();
        };
    }
})(angular);
