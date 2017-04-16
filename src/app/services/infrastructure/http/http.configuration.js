(function() {
    'use strict';

    angular.module('photocloud')
        .factory('httpConfiguration', httpConfiguration);

    function httpConfiguration() {
        var self = this;

        self.baseUri = 'http://krypapp.com/';

        return {
            baseUri: self.baseUri
        }
    }
})();