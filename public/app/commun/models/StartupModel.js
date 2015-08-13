(function() {
    'use strict';
    angular.module('welcome')
        .service('StartupModel',[ StartupModel]);
    function StartupModel () {

        this.setStartup = function (data) {
            //set defaults properties and functions
            angular.extend(this, {
                id: null
            });
            angular.extend(this, data);
        };

    }
}())