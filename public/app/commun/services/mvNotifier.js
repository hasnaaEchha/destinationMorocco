/**
 * Created by hassna on 17/07/2015.
 */
angular.module("welcome").value("mvToastr",toastr);
angular.module("welcome").factory("mvNotifier",["mvToastr",mvNotifier]);
function mvNotifier(mvToastr){
    return {

        notify:function(msg){
            mvToastr.success(msg);
        }
    }

}