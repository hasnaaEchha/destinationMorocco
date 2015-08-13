/**
 * Created by hassna on 07/08/2015.
 */
angular.module('welcome')
    .controller('ContactCtrl',['Resources','$timeout','$location', '$window',ContactCtrl]);
function ContactCtrl(Resources,$timeout,$location, $window){

    var vm=this;
    vm.mail={};
    vm.sendEmail=function(){
        Resources.Email.save(vm.mail);
        $timeout(function(){
            $window.location.reload();

        },1000)
        console.log(vm.mail);
    }




}