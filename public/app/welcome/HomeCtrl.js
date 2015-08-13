/**
 * Created by hassna on 05/08/2015.
 */
angular.module('welcome')
    .controller('HomeCtrl',['$timeout',HomeCtrl]);
function HomeCtrl($timeout){

   var vm=this;
    vm.searchDistination=false;
    vm.isSearching=function(){

        vm.searchDistination=!vm.searchDistination;
        return vm.searchDistination;
    }

}