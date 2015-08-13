/**
 * Created by hassna on 06/08/2015.
 */
(function() {
    'use strict';
    angular.module('welcome')
        .service('QuestionModel',[QuestionModel]);
    function QuestionModel () {

        this.setQuestion = function (data) {
            //set defaults properties and functions
            angular.extend(this, {
                id: null
            });
            angular.extend(this, data);
        };

    }
}())