/**
 * Created by hassna on 03/06/2015.
 */
(function(){
    'use strict';

    var welcome=angular.module("welcome",["ui.router",
        "ui.mask",
        "ngResource",
        "ngStorage",
        "ngCookies",]);
    welcome.config(["$stateProvider","$urlRouterProvider",welcomeConf]);
    function welcomeConf($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/accueil/welcome")
        $stateProvider

            .state("accueil",{
                url:"/accueil",
                abstract:true,
                templateUrl:"app/welcome/welcomeView.html"

            })
            .state('accueil.contact',{
                url:"/contact",
                templateUrl:"app/welcome/contact.html",
                controller:"ContactCtrl as vm"

            })
            .state('accueil.welcome',{
                url:"/welcome",
                templateUrl:"app/welcome/listRequest.html",
                controller:"ListRequestCtrl as vm",
                resolve:{
                    Resources:"Resources",
                    questions:function(Resources){
                        var result= Resources.Question.query().$promise;
                        console.log(result);
                        return result;

                    }
                }

            })
            .state('accueil.ask',{
                url:"/ask",
                templateUrl:"app/requests/ask.html",
                controller:"AskCtrl as vm",
                resolve:{
                    Resources:"Resources",
                    city:function(Resources){
                        var result= Resources.City.query().$promise;

                        return result;

                    }
                }

            })
            .state('list',{
                url:"/list",
                templateUrl:"app/responses/questions.html"

            })
            .state('list.questions',{
                url:"/questions",
                templateUrl:"app/responses/listRequests.html",
                controller:"ListRequestCtrl as vm",
                resolve:{
                    Resources:"Resources",
                    questions:function(Resources){
                        var result= Resources.Question.query().$promise;
                        console.log(result);
                        return result;

                    }
                }
            })
            .state('list.responses',{
                url:"/questions/:id",
                templateUrl:"app/responses/responses.html",
                controller:"ResponsesCtrl as vm",
                resolve:{
                    Resources:"Resources",
                    question:function(Resources,$stateParams){
                        var id=$stateParams.id;
                        var result= Resources.Question.get({id:id}).$promise;
                        console.log(result);
                        return result;

                    },
                    responses:function(Resources,$stateParams){
                        var questionId=$stateParams.id;
                        console.log(questionId);
                        return Resources.Response.query({questionId:questionId}).$promise;

                    }
                }
            })

    }

}());