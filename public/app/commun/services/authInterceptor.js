/**
 * Created by hassna on 17/07/2015.
 */
angular.module("welcome").factory('authInterceptor', function ($rootScope, $q, $window,$location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.tokenClient) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.tokenClient;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
                // $location.url('/');
            }
            return $q.reject(rejection);
            //return "n'a pas d'acces";
        }
    };
});
