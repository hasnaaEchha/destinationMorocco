/**
 * Created by hassna on 17/07/2015.
 */
angular.module("welcome").factory("mIdentity",["$cookieStore","$location","$window",mIdentity]);
function mIdentity($cookieStore,$location,$window){
    return {
        currentUser:  $cookieStore.get('profile'),
        isAuthenticated: function(){
            this.currentUser=$cookieStore.get('profile');
            if(!this.currentUser){
                this.currentUser=$cookieStore.get('member');
            }
            return !!this.currentUser;
        },
        isStartup:function(){
            return $cookieStore.get('profile');
        },
        logout:function(){
            if($cookieStore.get('profile'))
                $cookieStore.remove('profile');
            if($cookieStore.get('member'))
                $cookieStore.remove('member');
            $location.url("/");
            $window.location.reload();
        }
    }
}
