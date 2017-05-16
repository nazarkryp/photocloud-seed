(function (angular) {
    'use strict';

    angular.module('photocloud')
        .filter('caption', caption);

    caption.$inject = ['$filter', '$sce'];

    function caption($filter, $sce) {
        return function (text, target, type) {
            if (!text) {
                return text;
            }

            if (text.includes('#')) {
                text = text.replace(/#(\w+)/g, "<a class='hashtag' href='/#/explore/tags/$1'>$&</a>");
            }

            if (text.includes('@')) {
                text = text.replace(/@(\w+)/g, "<a class='hashtag' href='/#/$1'>$&</a>");
            }

            $sce.trustAsHtml(text);

            return text;
        };
    }
})(angular);
