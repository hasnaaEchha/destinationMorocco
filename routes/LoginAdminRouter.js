/**
 * Created by hassna on 20/07/2015.
 */
var Router=require('./Router');
var express = require('express');
var Class = require('../Template');
var jwt = require('jsonwebtoken');
var admin =Class.extend({
    resourceRouter : express.Router(),
    initialize : function() { // initialize is called by constructor at instanciation.
        this.numberOfLegs = 4;
    },
    getLoginAdminRouter:function(Admin){
        var secret = 'this is the secret secret secret 12356';

        this.resourceRouter.route('/')
            .post(function(req, res){
                var admin=new Admin(req.body);

                        Admin.findOne({name:admin.name,password:admin.password},function(err,result,next){
                            if(err){
                                return next(err);
                            }
                            if(!result){

                                return  res.status(401).send("le mot de passe ou le nom ne sont pas correctes");
                            }
                            else{
                                var token = jwt.sign(result, secret, { expiresInMinutes: 65 });
                                res.json({ token: token });
                            }
                        });
            });
        return this.resourceRouter;
    }
});
module.exports=admin;