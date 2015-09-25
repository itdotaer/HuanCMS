(function() {
    'use strict';

    angular
        .module('services')
        .factory('userService', userService);

    userService.$inject = ['$http', '$q', '$cookies', 'md5','logger', 'APIURL', 'DEBUG'];

    function userService($http, $q, $cookies, md5, logger, APIURL, DEBUG) {
        var service = {
            login: login
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
    }
})();
