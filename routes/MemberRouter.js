/**
 * Created by hassna on 18/07/2015.
 */
var Class = require('../Template');
var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var secret = 'this is the secret secret secret 12356';
var member =Class.extend({
    test:"hello",
    resourceRouter : express.Router(),
    initialize : function() { // initialize is called by constructor at instanciation.
        this.numberOfLegs = 4;
    },
    getMemberRouter:function(Member){
        this.resourceRouter.route('/:id')
            .delete(function(req,res,err){
            Member.remove({_id:req.params.id},function(err,resource){
                if(err){
                    next(err)
                }
                else{
                    res.status(201).send({success:true});
                }

            })
        })
        this.resourceRouter.route('/')
            .get(function(req,res){
                var member=new Member(req.body);
                Member.find({startupId:member.startupId},function(err,resources){

                    res.json(resources);
                });
            })

            .post(function(req,res,next){
                var member=new Member(req.body);
                Member.findOne({startupId:member.startupId,userName:member.userName},function(err,resource){
                    if(err){
                        res.status(500).send(null);
                    }
                    if(!resource){
                        member.save(function(err,data){
                            if(err){
                                next(err);
                            }
                            else{
                                res.status(201).send({success:true});
                            }
                        })
                    }
                    else
                    {
                        res.status(201).send({success:false});
                    }
                })
            });
            this.resourceRouter.route('/:startupId')
                .get(function(req, res, next) {

                    // check header or url parameters or post parameters for token
                    var token = req.query.tokenStartup ||req.query.tokenMember ||req.body.tokenStartup|| req.headers['x-access-token'];
                    console.log(req.query.tokenStartup)

                    // decode token
                    if (token) {

                        // verifies secret and checks exp
                        jwt.verify(token, secret, function(err, decoded) {
                            if (err) {
                                console.log("yop");
                                return res.json({ success: false, message: 'Failed to authenticate token.' });
                            } else {
                                // if everything is good, save to request for use in other routes
                                console.log("yep");
                                Member.find({startupId:req.params.startupId},function(err,resources){

                                    res.json(resources);
                                });
                            }
                        });


                    } else {
                        console.log("No token provided.")
                        // if there is no token
                        // return an error
                        return res.status(401).send({
                            success: false,
                            message: 'No token provided.'
                        });

                    }
                });
        return this.resourceRouter;
    }
});
module.exports=member;