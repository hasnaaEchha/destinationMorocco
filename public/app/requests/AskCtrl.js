/**
 * Created by hassna on 06/08/2015.
 */
(function(){
    "use strict";
    angular.module("welcome").controller('AskCtrl',['QuestionModel','Resources','city','$location',
        '$window','$timeout',AskCtrl]);
    function AskCtrl(QuestionModel,Resources,city,$location, $window,$timeout){
        var vm=this;
        vm.city=city;
        console.log(city);
        vm.question={};
        vm.question.ville="Casablanca";
        vm.storeQuestion=function(){
            QuestionModel.setQuestion(vm.question);
            $("#questionModal").modal('show');
        }
        vm.save=function(){

            if(vm.question.name[vm.question.name.length-1]!=='?')
            QuestionModel.name=QuestionModel.name+" ??";
            Resources.Question.save(QuestionModel);
            toastr.success("Envoyer");
            $timeout(function(){
                $window.location.reload();
                $("#questionModal").modal('hide');
            },1000)

        }
        vm.changeVille=function(name){
            vm.question.ville=name;
        }

    }
}())
