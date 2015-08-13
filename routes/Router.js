var Class = require('../Template');
var express = require('express');
var Router = Class.extend({
    test:"hello",
    resourceRouter : express.Router(),
    initialize : function() { // initialize is called by constructor at instanciation.
        this.numberOfLegs = 4;
    },
    getRouter : function(ResourceModel) {
        this.resourceRouter.route('/')
            .get(function(req,res){
                ResourceModel.find(function(err,resources){

                    res.json(resources);
                });
            })
            .post(function(req, res){
                var resourceModel = new ResourceModel(req.body);

                resourceModel.save(function(err,rsc){
                    if(err){

                    }
                    else {

                    }
                });
                res.status(201).send(resourceModel);
            });
        return this.resourceRouter;
    }
});
module.exports = Router;