(function (angular) {
    'use strict';

    angular.module('photocloud')
        .directive('alternativeUserImage', alternativeUserImage);

    function alternativeUserImage() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$observe('ngSrc', function (ngSrc) {
                    if (!ngSrc) {
                        element.attr('src', 'assets/images/user.png');
                    }
                });
            }
        };
    }
})(angular);
