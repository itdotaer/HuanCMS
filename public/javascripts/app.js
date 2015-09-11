(function() {
    'use strict';
    var app = angular.module('app', ['ui.router', 'angularFileUpload', 'ngCookies', 'angular-md5', 'services', 'nav-bar', 'status', 'ui.bootstrap']);

    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ]);

    router.$inject = ['$stateProvider', '$urlRouterProvider'];
    routeChanged.$inject = ['userService', 'departmentService', '$cookies', '$state', '$rootScope', '$location', 'logger', 'DEBUG'];

    //Router
    app.config(router);
    app.run(routeChanged);

    function router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/filesUpload');

        $stateProvider
            /*.state('index', {
                url: '/',
                templateUrl: '/app/views/main.html',
                controller: 'MainCtrl'
            })*/
            .state('login', {
                url: '/login',
                templateUrl: '/app/views/user/login.html',
                controller: 'LoginCtrl'
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            })
            .state('userInfo', {
                url: '/userInfo',
                templateUrl: '/app/views/user/userInfo.html'
            })
            .state('users', {
                url: '/users',
                templateUrl: '/app/views/user/users.html',
                controller: 'UsersCtrl'
            })
            .state('editUserInfo', {
                url: '/editUserInfo',
                templateUrl: '/app/views/user/editUserInfo.html',
                controller: 'EditUserInfoCtrl'
            })
            .state('filesUpload', {
              url: '/filesUpload',
              templateUrl: '/app/views/files/filesUpload.html',
              controller: 'FilesUploadCtrl'
            })
            .state('myUploadFiles', {
                url: '/myUploadFiles?fileName',
                templateUrl: '/app/views/files/myUploadFiles.html',
                controller: 'MyUploadFilesCtrl'
            })
            .state('filesList', {
              url: '/filesList',
              templateUrl: '/app/views/files/filesList.html',
              controller: 'FilesListCtrl'
            })
            .state('filesApproval', {
                url: '/filesApproval?fileName',
                templateUrl: '/app/views/files/filesApproval.html',
                controller: 'FilesApprovalCtrl'
            })
            .state('filesStatus', {
              url: '/filesStatus?fileName',
              templateUrl: '/app/views/files/filesStatus.html',
              controller: 'FilesStatusCtrl'
            })
            .state('departments', {
                url: '/departments',
                templateUrl: '/app/views/departments/departments.html',
                controller: 'DepartmentsCtrl'
            });
    }

    function routeChanged(userService, departmentService, $cookies, $state, $rootScope, $location, logger, DEBUG) {
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            //Here to get a http request to identify if the user if loged in(session stored user's information)
            //Todo: user's login control
            if(toState.name === 'logout' || toState === 'login'){
                return;
            }

            $rootScope.fromStateObject = {state: fromState, params: fromParams};
            if(DEBUG) console.log('fromStaterObject', $rootScope.fromStateObject);

            userService.getLoginUser()
                .then(function(res){
                    var data = angular.fromJson(res.Data.Data);
                    if(DEBUG) console.log('Login user:', data);
                    if(data){
                        $rootScope.isAuthed = true;
                        $rootScope.authedUser = data;

                        departmentService.getById($rootScope.authedUser.DepartmentId)
                            .then(function(res){
                                var data = res.Data;
                                if(data.HasError){
                                    logger.logError(data.ErrorMsg);
                                }else{
                                    var department = angular.fromJson(data.Data);
                                    $rootScope.authedUser.DepartmentName = department.Name;
                                }
                            });
                    }else{
                        $rootScope.isAuthed = false;
                        $rootScope.authedUser = {};

                        $state.go("login");
                        if(DEBUG) console.log(toState);
                        if(toState.name != 'login'){
                            logger.logError('User not login.');
                        }
                        e.preventDefault();
                    }
                })
                .catch(function(error){
                    logger.logError(error.Message);
                });
        });
    }

    //Constants
    app.constant('DEBUG', true);
    app.constant('APIURL', 'api/');
})();
