(function () {
    'use strict';

    angular.module('photocloud')
        .factory('httpConfiguration', httpConfiguration);

    function httpConfiguration() {
        var self = this;

        // self.baseUri = 'http://krypapp.com/';
        //self.baseUri = 'http://localhost:33226/';
        self.baseUri = 'https://krypapp.azurewebsites.net/';

        return {
            baseUri: self.baseUri
        };
    }
})();
