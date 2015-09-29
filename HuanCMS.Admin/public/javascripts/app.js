(function() {
    'use strict';
    var app = angular.module('app', ['ui.router', 'angularFileUpload', 'ngCookies','angular-md5', 'ui.bootstrap', 'services', 'header', 'left', 'footer', 'login']);

    app.config(['$httpProvider', function($httpProvider) {
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];

        function authInterceptor($q, logger){
            var interceptor = {
                'request': function(config){
                    config.headers = config.headers || {};
                    if(window.localStorage.getItem('token')){
                        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token');
                    }

                    return config;
                },
                'responseError': function(response){
                    if(response.status === 401 || response.status === 403){
                        logger.logError('Not authed!');
                        window.localStorage.isAuthed.setItem('isAuthed', false);
                        window.localStorage.loginUser.setItem('loginUser', angular.toJson({}));
                    }
                }
            };

            return interceptor;
        }

        authInterceptor.$inject = ['$q', 'logger'];

        $httpProvider.interceptors.push(authInterceptor);
    }]);

    router.$inject = ['$stateProvider', '$urlRouterProvider'];
    routeChanged.$inject = ['$cookies', '$state', '$rootScope', '$location', 'userService', 'logger', 'DEBUG'];

    //Router
    app.config(router);
    app.run(routeChanged);

    function router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: '/views/main.html',
                controller: 'MainCtrl'
            })
            .state('users', {
                url: '/users',
                templateUrl: '/views/user/users.html',
                controller: 'UsersCtrl'
            })
    }

    function routeChanged($cookies, $state, $rootScope, $location, userService, logger, DEBUG) {
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            //Here to get a http request to identify if the user if loged in(session stored user's information)
            //Todo: user's login control
            // if(window.localStorage){
            //     //User has login
            //     userService.getLoginUser()
            //         .then(function(res){
            //             if(res.errorMsg){
            //                 logger.logError(res.errorMsg);
            //             }else{
            //                 if(res.data){
            //                     $rootScope.isAuthed = true;
            //                     $rootScope.loginUser = res.data;
            //                 }
            //             }
            //         })
            //         .catch(function(error){
            //             logger.logError(error);
            //         })
            // }

            $rootScope.isAuthed = angular.fromJson(window.localStorage.getItem('isAuthed'));
            $rootScope.loginUser = angular.fromJson(window.localStorage.getItem('loginUser'));
            if(DEBUG) console.log('is authed', window.localStorage.getItem('isAuthed'));
            if(DEBUG) console.log('login user', angular.fromJson(window.localStorage.getItem('loginUser')));
        });
    }

    //Constants
    app.constant('DEBUG', true);
    app.constant('APIURL', 'http://localhost:3000/api/');
})();
