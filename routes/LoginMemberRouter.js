/**
 * Created by hassna on 19/07/2015.
 */
var Router=require('./Router');
var express = require('express');
var Class = require('../Template');
var jwt = require('jsonwebtoken');
var Startup=require('../models/Startup');

var member =Class.extend({

    resourceRouter : express.Router(),
    initialize : function() { // initialize is called by constructor at instanciation.
        this.numberOfLegs = 4;
    },
    getLoginMemberRouter:function(Member){
        var secret = 'this is the secret secret secret 12356';

        this.resourceRouter.route('/')
            .post(function(req, res){
                var member=new Member(req.body);

                Startup.findOne({startupName:req.body.startupName},function(err,startup,next){

                    if(startup){
                        Member.findOne({userName:member.userName,password:member.password,startupId:startup._id.toString()},function(err,result,next){

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

                    }

                })
            });
        return this.resourceRouter;
    }
});
module.exports=member;