var Router=require('./Router');
var Class = require('../Template');
var express = require('express');
var jwt = require('jsonwebtoken');
var secret = 'this is the secret secret secret 12356';
var startup =Router.extend({

    getStartupRouter:function(Startup){

        this.resourceRouter.route('/')
            .get(function(req, res, next) {

                // check header or url parameters or post parameters for token
                var token = req.body.tokenAdmin ||req.query.tokenAdmin|| req.headers['x-access-token'];


                // decode token
                if (token) {

                    // verifies secret and checks exp
                    jwt.verify(token, secret, function(err, decoded) {
                        if (err) {
                            console.log("yop");
                            return res.json({ success: false, message: 'Failed to authenticate token.' });
                        } else {
                            // if everything is good, save to request for use in other routes
                            Startup.find(function(err,result){
                                if(err){
                                    next(err)
                                }
                                else{
                                    res.json(result);
                                }
                            })
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
            })
            .post(function(req, res){
                var startup = new Startup(req.body);
                var error={};
                Startup.findOne({startupName:startup.startupName},function(err,old){

                    if(err){
                        res.status(500).send(null);
                    }
                    if(!old){

                        startup.save(function(err,rsc){
                            if(err){
                            }

                        });
                        res.status(201).send(startup);
                    }
                    else
                    {
                        error={startupName:true};
                        res.status(201).send(error);}

                });
            });
        this.resourceRouter.route('/:id')
            .delete(function(req,res,err){
                Startup.remove({_id:req.params.id},function(err,resource){
                    if(err){
                        next(err)
                    }
                    else{
                        res.status(201).send({success:true});
                    }

                })
            })
            .put(function(req,res,next){

                Startup.findById(req.body._id,function(err,result){

                    if(err){
                        next(err);
                    }
                    else{

                        result.activated=true;
                        result.save(function(err,data){
                            if(err){
                                next(err);
                            }
                            else{


                            }
                        });
                        res.status(201).send({success:true});
                    }
                })
            })


        this.resourceRouter=this.getRouter(Startup);
        return this.resourceRouter;
    }
});
module.exports=startup;