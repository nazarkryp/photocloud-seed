(function() {
    'use strict';

    angular.module('photocloud', ['ngMaterial', 'ui.router', 'ngMaterial', 'ngMessages', 'ngSanitize', 'ngFileUpload', 'ngCookies']);
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', '$state', 'session'];

    function httpInterceptor($q, $state, session) {
        return {
            'request': function(config) {
                var sessionInfo = session.getSession();

                if (sessionInfo) {
                    config.headers.Authorization = 'Bearer ' + sessionInfo.token;
                }

                return config;
            },
            'requestError': function(rejection) {
                return $q.reject(rejection);
            },
            'response': function(response) {
                return response;
            },
            'responseError': function(rejection) {
                return $q.reject(rejection);
            }
        }
    }
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .factory('session', session);

    session.$inject = ['$cookies'];

    function session($cookies) {
        var self = {};

        self.key = 'session';

        self.setSession = function(session) {
            $cookies.put(self.key, session);
        }

        self.getSession = function() {
            return $cookies.get(self.key);
        }

        self.cleanSession = function() {
            $cookies.remove(self.key);
        }

        return {
            setSession: self.setSession,
            getSession: self.getSession,
            cleanSession: self.cleanSession
        }
    }
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .service('httpService', httpService);

    httpService.$inject = ['$http', 'httpConfiguration'];

    function httpService($http, httpConfiguration) {
        this.get = function(url, deferred) {
            $http.get(httpConfiguration.baseUri + url)
                .then(
                    function onSuccess(response) {
                        deferred.resolve(response);
                    },
                    function onError(error) {
                        deferred.reject(error);
                    }
                );
        }
    }
})();
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
(function() {
    'use strict';

    angular.module('photocloud')
        .controller('CreateAccountController', CreateAccountController);

    CreateAccountController.$inject = ['accountService'];

    function CreateAccountController(accountService) {
        var vm = this;

        vm.$onInit = function() {

        }
    }
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['accountService'];

    function SignInController(accountService) {
        var vm = this;

        vm.$onInit = function() {

        }
    }
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .controller('HomeController', HomeController);

    function HomeController() {
        var vm = this;

        vm.$onInit = function() {

        }
    }
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .controller('AboutController', AboutController);

    function AboutController() {
        var vm = this;

        vm.$onInit = function() {

        }
    }
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .service('accountService', accountService);

    accountService.$inject = ['$q', 'httpService'];

    function accountService($q, httpService) {
        this.getAccount = function() {
            var deferred = $q.defer();

            httpService.get('account');

            return deferred.promise;
        }
    }
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .controller('IndexController', IndexController);

    function IndexController() {

    }
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .run(run);

    run.$inject = ['$rootScope', '$state', 'session'];

    function run($rootScope, $state, session) {
        $rootScope.$on("$stateChangeStart", stateChangeStart);

        function stateChangeStart(event, next) {

            var sessionInfo = session.getSession();

            if (sessionInfo && sessionInfo.isAuthenticated) {
                if (next.url !== '/settings' && !sessionInfo.isActive) {
                    $state.go('settings', { isRedirected: true });
                    event.preventDefault();
                } else if (next.url === '/signin' || next.url === '/signup') {
                    $state.go('feed');
                    event.preventDefault();
                }
            } else if (next.url !== '/signin' && next.url === '/') {
                $state.go('signin');
                event.preventDefault();
            }
        }
    }
})();
(function() {
    'use strict';

    angular.module('photocloud')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function configRoutes($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/home.template.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'app/components/account/signin/signin.template.html',
                controller: 'SignInController',
                controllerAs: 'vm'
            })
            .state('signup', {
                url: '/account/create',
                templateUrl: 'app/components/account/create/create-account.template.html',
                controller: 'CreateAccountController',
                controllerAs: 'vm'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/components/about/about.template.html',
                controller: 'AboutController',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('httpInterceptor');
    }
})();
angular.module('photocloud').run(['$templateCache', function($templateCache) {$templateCache.put('app/components/about/about.template.html','<div><code>(function() { \'use strict\'; angular.module(\'photocloud\') .controller(\'AboutController\', AboutController); function AboutController() { var vm = this; } })();</code></div>');
$templateCache.put('app/components/home/home.template.html','<h1>PhotoCloud</h1><h2>Comming Soon</h2>');
$templateCache.put('app/components/account/create/create-account.template.html','<div>Create account</div>');
$templateCache.put('app/components/account/signin/signin.template.html','<div>Sign In</div>');}]);