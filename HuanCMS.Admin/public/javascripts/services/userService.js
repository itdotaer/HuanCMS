(function() {
    'use strict';

    angular
        .module('services')
        .factory('userService', userService);

    userService.$inject = ['$http', '$q', '$cookies', '$rootScope', 'md5', 'logger', 'APIURL', 'DEBUG'];

    function userService($http, $q, $cookies, $rootScope, md5, logger, APIURL, DEBUG) {
        var service = {
            login: login,
            logout: logout,
            get: get,
            getById: getById,
            add: add,
            update: update,
            delete: remove,
            search: search
        };

        return service;

        function login(user) {
            var deferred = $q.defer();
            if(DEBUG) console.log('user', user);
            // user.pwd = md5.createHash(user.pwd);

            //Validate user info from backend database.
            $http.post(APIURL + 'users/login', angular.toJson(user),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function logout(success){
            window.localStorage.setItem('isAuthed', false);
            window.localStorage.setItem('loginUser', angular.toJson({}));
            window.localStorage.removeItem('token');

            $rootScope.isAuthed = angular.fromJson(window.localStorage.getItem('isAuthed'));
            $rootScope.loginUser = angular.fromJson(window.localStorage.getItem('loginUser'));

            success();
        }

        function get(index, size){
            var deferred = $q.defer();

            $http.get(APIURL + 'users?index=' + index + '&size=' + size)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function add(user){
            var deferred = $q.defer();

            if(DEBUG) console.log('Prepare add user:' + angular.toJson(user));

            $http.post(APIURL + 'users', angular.toJson(user), {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function update(user){
            var deferred = $q.defer();

            $http.put(APIURL + 'user/' + user._id, angular.toJson(user), {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function remove(userId){
            if(DEBUG) console.log('Delete by userId', userId)
            var deferred = $q.defer();

            $http.delete(APIURL + 'user/' + userId)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function getById(userId){
            if(DEBUG) console.log('Get user by id', userId);
            var deferred = $q.defer();

            $http.get(APIURL + 'user/' + userId)
                .success(deferred.resolve)
                .error(deferred.reject);
                
            return deferred.promise;
        }

        function search(searchTxt, index, size){
            var deferred = $q.defer();

            $http.post(APIURL + 'users/search?index=' + index + '&size=' + size, angular.toJson({searchTxt: searchTxt}),{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }
    }
})();
