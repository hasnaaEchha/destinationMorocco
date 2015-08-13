/**
 * Created by hassna on 28/07/2015.
 */
var Class = require('../Template');
var express = require('express');
var jwt = require('jsonwebtoken');
var secret = 'this is the secret secret secret 12356';
var metric =Class.extend({

    test:"hello",
    resourceRouter : express.Router(),
    initialize : function() { // initialize is called by constructor at instanciation.
        this.numberOfLegs = 4;
    },
    getMetricRouter:function(Metric){

        this.resourceRouter.route('/:bmId')
            .get(function(req,res){
                Metric.find({bmId:req.params.bmId,type:req.query._type},function(err,resources){
                    if(err){
                      next(err);
                    }else{
                        res.json(resources);
                    }
                });
            })
        return this.resourceRouter;

    }
});
module.exports=metric;