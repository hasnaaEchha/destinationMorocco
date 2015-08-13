/**
 * Created by hassna on 16/07/2015.
 */
var Router=require('./Router');
var express = require('express');
var Class = require('../Template');
var jwt = require('jsonwebtoken');
var startup =Class.extend({
    test:"hello",
    resourceRouter : express.Router(),
    initialize : function() { // initialize is called by constructor at instanciation.
        this.numberOfLegs = 4;
    },
    getLoginRouter:function(Startup){
        var secret = 'this is the secret secret secret 12356';

        this.resourceRouter.route('/')
            .post(function(req, res){
                var startup=new Startup(req.body);
                Startup.findOne({email:startup.email,password:startup.password,activated:true},function(err,result,next){

                    if(err){
                        return next(err);
                    }
                    if(!result){

                        return  res.status(401).send("le mot de passe ou l'email ne sont pas correctes");
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
module.exports=startup;