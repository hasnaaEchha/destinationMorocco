/**
 * Created by hassna on 06/08/2015.
 */
(function(){
    "use strict";
    angular.module("welcome").controller('ListRequestCtrl',['questions','$location',
        '$window',ListRequestCtrl]);
    function ListRequestCtrl(questions,$location, $window){

        var vm=this;
        vm.setOrder="-_date";
        vm.questions=questions;
        console.log(questions);

    }
}())
