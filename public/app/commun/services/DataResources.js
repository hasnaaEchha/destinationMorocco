(function(){
    "use strict";
    angular.module("welcome")
        .service('Resources',['$resource',Resources]);
    function Resources($resource){
        return{
            Question:$resource("/questions/:id", null,{'update':{method:'PUT'}}),
            Response:$resource("/responses/:id", null,{'update':{method:'PUT'}}),
            City:$resource("/cities/:id", null,{'update':{method:'PUT'}}),
            Email:$resource("/sendEmail", null,{'update':{method:'PUT'}})

        }
    }
}())

