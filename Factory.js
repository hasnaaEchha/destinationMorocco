var express=require('express'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser');
var Startup=require('./models/Startup'),
    Project=require('./models/Project'),
    Member=require('./models/Member'),
    BusinessModel=require('./models/BusinessModel'),
    Metric=require('./models/Metric'),
    Admin=require('./models/Admin');

//startupRouter=require('./routes/startup')(Startup);
StartupRouter=require('./routes/StartupRouter');
LoginRouter=require('./routes/LoginRouter');
LoginMemberRouter=require('./routes/LoginMemberRouter');
LoginAdminRouter=require('./routes/LoginAdminRouter');
ProjectRouter=require('./routes/ProjectRouter');
MemberRouter=require('./routes/MemberRouter');
BMRouter=require('./routes/BMRouter');
MetricRouter=require('./routes/MetricRouter');
WelcomeRouter=require('./routes/WelcomeRouter');
var getRouter = function(resource){
    switch (resource){
        case "welcome":
            return new WelcomeRouter().getWelcomeRouter();
        case "metric":
            return new MetricRouter().getMetricRouter(Metric);
        case "authenticateStartup":
            return new LoginRouter().getLoginRouter(Startup);
        case "authenticateMember":
            return new LoginMemberRouter().getLoginMemberRouter(Member);
        case "authenticateAdmin":
            return new LoginAdminRouter().getLoginAdminRouter(Admin);
        case "start-up":
            return new StartupRouter().getStartupRouter(Startup);
        case "project":
            return new ProjectRouter().getProjectRouter(Project);
        case "member":
            return new MemberRouter().getMemberRouter(Member);
        case "bm":
            return new BMRouter().getBMRouter(BusinessModel);

    }

}
module.exports = getRouter;

