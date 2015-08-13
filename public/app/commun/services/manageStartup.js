/**
 * Created by hassna on 19/07/2015.
 */

(function(){
    "use strict";
    angular.module("welcome").factory("manageStartup",["Resources","$q",manageStartup]);
    function manageStartup(Resources,$q){
        var def=$q.defer();
        return{
            saveStartup:function(Member){
                Resources.Member.save(Member,function(data){

                        def.resolve(data.success);
                    },
                    function(err){

                    })
                return def.promise;
            },
            deleteStartup:function(id){
                Resources.Startup.delete({id:id},function(data){

                    def.resolve(data);
                },function(err){
                })
                return def.promise;
            },
            updateStartup:function(Startup){
            Resources.Startup.update({id:Startup._id},Startup)
            return def.promise;
        }
        }
    }
}());
