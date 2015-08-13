/**
 * Created by hassna on 17/07/2015.
 */
"use strict"
var Router=require('./Router');
var Class = require('../Template');
var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var secret = 'this is the secret secret secret 12356';
var hal={

        self: {
            href: "/leanAPI/projects/"
        },
        curies: [
            {
                name: "ht",
                href: "http://localhost.com/rels/{rel}",
                templated: true
            }
        ],
        "ht:projects": {

        }



}
var project =Class.extend({
    test:"hello",
    resourceRouter : express.Router(),
    initialize : function() { // initialize is called by constructor at instanciation.
        this.numberOfLegs = 4;
    },
    getProjectRouter:function(Project){
        this.resourceRouter.route('/')
            .post(function(req,res){
                var project=new Project(req.body);
                Project.findOne({startupId:project.startupId , name:project.name},function(err,resources){
                    if(err){
                        res.status(500).send(null);
                    }
                    if(!resources){

                        project.save(function(err,data){

                            if(err){
                                next(err);
                            }
                            else{
                                res.status(201).send(project);
                            }
                        })
                    }
                    else
                    {
                        res.status(201).send({error:"this project already exist"});
                    }
                })
            })
        this.resourceRouter.route('/:startupId')
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

                            Project.find({startupId:req.params.startupId},function(err,resources){
                                var i,n=resources.length;
                                var response=[];
                                response.length=n;


                                for( i=0;i<n;i++)
                                {
                                    hal.self.href=hal.self.href+req.params.startupId+"/"+resources[i]._id;

                                    resources[i]._links=hal;
                                    response[i]=resources[i];


                                }


                                res.json(response);
                            });
                        }
                    });


                } else {

                    // if there is no token
                    // return an error
                    return res.status(401).send({
                        success: false,
                        message: 'No token provided.'
                    });

                }
            });
        this.resourceRouter.route('/:id')
            .put(function(req,res,next){

                Project.findById(req.body._id,function(err,result){
                    if(err){
                        next(err);
                    }
                    else{
                        for(var p in req.body)
                        {
                            result[p] = req.body[p];
                        }
                        result.save();
                        res.status(201).send({success:true});
                    }
                })
            });
        this.resourceRouter.route('/:startupId/:id')
            .get(function(req,res,next){
                Project.findById(req.params.id,function(err,result){
                    if(err){
                        next(err)
                    }
                    else{
                        res.json(result);
                    }
                })
            })
       // this.resourceRouter=this.getRouter(Project);
        return this.resourceRouter;
    }
});
module.exports=project;