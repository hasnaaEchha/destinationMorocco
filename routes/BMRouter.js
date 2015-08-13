/**
 * Created by hassna on 19/07/2015.
 */
var Class = require('../Template');
var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var Project=require('../models/Project');
var jwt = require('jsonwebtoken');
var secret = 'this is the secret secret secret 12356';
var bm =Class.extend({
    test:"hello",
    resourceRouter : express.Router(),
    initialize : function() { // initialize is called by constructor at instanciation.
        this.numberOfLegs = 4;
    },
    getBMRouter:function(BusinessModel){
        this.resourceRouter.route('/:id')
            .delete(function(req,res,next){
                BusinessModel.remove({_id:req.params.id},function(err,resource){
                    if(err){
                        next(err)
                    }
                    else{
                        res.status(201).send({success:true});
                    }
                })
            })
            .put(function(req,res,next){

                BusinessModel.findById(req.body._id,function(err,result){
                    if(err){
                        next(err);
                    }
                    else{
                        for(var p in req.body)
                        {
                            result[p] = req.body[p];
                        }
                        result.save(function(err,data){
                            if(err){
                                next(err);
                            }
                            else{
                                Project.findById(data.projectId,function(err,project){
                                    project.bmVersion++;
                                    project.save();
                                })

                            }
                        });
                        res.status(201).send({success:true});
                    }
                })
            })
        this.resourceRouter.route('/')
            .get(function(req, res, next) {

                // check header or url parameters or post parameters for token
                var token = req.body.tokenMember||req.query.tokenMember ||req.query.tokenStartup|| req.headers['x-access-token'];


                // decode token
                if (token) {

                    // verifies secret and checks exp
                    jwt.verify(token, secret, function(err, decoded) {
                        if (err) {

                            return res.json({ success: false, message: 'Failed to authenticate token.' });
                        } else {
                            // if everything is good, save to request for use in other routes
                            var bm=new BusinessModel(req.body);
                            BusinessModel.findOne({projectId:bm.projectId},function(err,resources){
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
            })
            .post(function(req,res,next){
                var bm=new BusinessModel(req.body);
                bm.save(function(err,data){
                    if(err){
                        next(err);
                    }
                    else{
                       Project.findById(data.projectId,function(err,project){
                            project.bmVersion++;
                            project.save();
                        })
                        res.status(201).send({success:true});
                    }
                })
            });
        this.resourceRouter.route('/:projectId')
            .get(function(req,res){
                BusinessModel.findOne({projectId:req.params.projectId},function(err,resources){
                    if(!resources){
                        res.json({_empty:true});
                    }else{

                        res.json(resources);
                    }

                });
            })

        return this.resourceRouter;

    }
});
module.exports=bm;