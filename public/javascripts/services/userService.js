(function() {
    'use strict';

    angular
        .module('services')
        .factory('userService', userService);

    userService.$inject = ['$http', '$q', '$cookies', 'md5','logger', 'APIURL', 'DEBUG'];

    function userService($http, $q, $cookies, md5, logger, APIURL, DEBUG) {
        var service = {
            login: login,
            logout: logout,
            update: update,
            add: add,
            delete: remove,
            getAll: getAll,
            getById: getById,
            getLoginUser: getLoginUser,
            getByDepartment: getByDepartment,
            getPrivillageList: getPrivillageList,
            getPermissionName: getPermissionName
        };

        return service;

        function getPrivillageList(){
            var privillageList = [
                {
                    id: 1,
                    displayName: 'Visitor',
                    value: 1
                },
                {
                    id: 2,
                    displayName: 'Normal',
                    value: 10
                },
                {
                    id: 3,
                    displayName: 'Approver',
                    value: 100
                },
                {
                    id: 4,
                    displayName: 'Admin',
                    value: 1000
                }
            ];

            return privillageList;
        }

        function getPermissionName(users){
            angular.forEach(users, function(user){
                angular.forEach(getPrivillageList(), function(permission){
                    if(permission.value === user.Permission){
                        user.PermissionName = permission.displayName;
                    }
                });
            });
        }

        function login(user) {
            var deferred = $q.defer();
            console.log('user', user);
            user.password = md5.createHash(user.Password);

            //Validate user info from backend database.
            $http.post(APIURL + 'users/login', angular.toJson(user), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function logout(){
            var deferred = $q.defer();

            $http.get(APIURL + 'users/logout')
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function getLoginUser(){
            var deferred = $q.defer();

            $http.get(APIURL + 'users/checklogin')
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function update(user) {
            var deferred = $q.defer();
            if(user.hasNewPassword){
                user.password = md5.createHash(user.Password + '');
            }
            $http.put(APIURL + 'users/update', angular.toJson(user), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function add(user){
            var deferred = $q.defer();

            user.password = md5.createHash(user.Password + '');

            $http.post(APIURL + 'users/add', angular.toJson(user))
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function getAll(userName, index, size){
            var deferred = $q.defer();
            if(!userName){
                userName = "";
            }

            $http.get(APIURL + 'users/get?userName=' + userName + '&index=' + index + '&size=' + size)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function getById(id){
            var deferred = $q.defer();

            $http.get(APIURL + 'users/get/' + id)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function remove(id){
            var deferred = $q.defer();

            $http.delete(APIURL + 'users/delete?userId=' + id)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function getByDepartment(id){
            var deferred = $q.defer();

            $http.get(APIURL + 'users/getbydepartment?id=' + id)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }
    }
})();
