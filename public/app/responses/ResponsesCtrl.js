/**
 * Created by hassna on 06/08/2015.
 */
(function(){
    "use strict";
    angular.module("welcome").controller('ResponsesCtrl',['question','responses','Resources','$location',
        '$window','$timeout',ResponsesCtrl]);
    function ResponsesCtrl(question,responses,Resources,$location, $window,$timeout){


        var vm=this;

        vm.dateConv=function(_date){
            var date1=new Date(_date);
            return date1.toUTCString();


        }
        vm.responses=responses;
        vm.repondre=false;
        vm.toggleRepondre=function(){
            vm.repondre=!vm.repondre;
        }
        vm.save=function(){
            vm.response.questionId=question._id;
            Resources.Response.save(vm.response);
            toastr.success("merci pour votre réponse");
            $timeout(function(){$window.location.reload();
            },1000)



        }
        vm.question=question;

    }
}())
