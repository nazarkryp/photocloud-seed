(function () {
    'use strict';

    angular.module('photocloud')
        .factory('httpConfiguration', httpConfiguration);

    function httpConfiguration() {
        var self = this;

        self.baseUri = 'http://krypapp.com/';
        //self.baseUri = 'http://localhost:33226/';

        return {
            baseUri: self.baseUri
        };
    }
})();
