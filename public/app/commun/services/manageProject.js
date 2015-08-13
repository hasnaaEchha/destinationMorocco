/**
 * Created by hassna on 18/07/2015.
 */
(function(){
    "use strict";
    angular.module("welcome").factory("manageProject",["Resources","$q","$stateParams",manageProject]);
    function manageProject(Resources,$q,$stateParams){
        var def=$q.defer();
        return{
            saveProject:function(Project){
                    Resources.Project.save(Project,function(data){
                            if(!data.error)
                                def.resolve({success:true});
                            else{
                                def.resolve({success:false,error:data.error});
                            }
                    },
                    function(err){
                        def.resolve({success:false});
                    })
                return def.promise;
            },
            updateProject:function(Project){
                Resources.Project.update({id:Project._id},Project)
                return def.promise;
            }
        }
    }
}());