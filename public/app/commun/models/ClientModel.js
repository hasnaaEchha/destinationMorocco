(function() {
    'use strict';
    angular.module('welcome')
        .service('ClientModel',[ ClientModel]);
    function ClientModel () {

        this.setClient = function (data) {
            //set defaults properties and functions
            angular.extend(this, {
                id: null
            });
            angular.extend(this, data);
        };

    }
}())