/**
 * Created by hassna on 25/07/2015.
 */
var Router=require('./Router');
var Class = require('../Template');
var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var response={
    _links: {
        self: {
            href: "/leanAPI"
        },
        curies: [
            {
                name: "ht",
                href: "http://localhost.com/rels/{rel}",
                templated: true
            }
        ],
        "ht:loginStartup": {
            "href": "/leanAPI/authenticateStartup"
        },
        "ht:loginMember": {
            "href": "/leanAPI/authenticateMember"
        },
        "ht:signup": {
            "href": "/leanAPI/start-ups"
        },
        "ht:signupMember": {
            "href": "/leanAPI/start-ups"
        },
        "ht:projects": {
            "href": "/leanAPI/projects"
        }


    },
    "welcome": "Welcome to a haltalk server.",
    "hint_1": "You need an account to post stuff..",
    "hint_2": "Create one by POSTing via the ht:signup link..",
    "hint_3": "Click the orange buttons on the right to make POST requests..",
    "hint_4": "Click the green button to follow a link with a GET request..",
    "hint_5": "Click the book icon to read docs for the link relation."
}
var project =Class.extend({

    resourceRouter : express.Router(),
    initialize : function() { // initialize is called by constructor at instanciation.
        this.numberOfLegs = 4;
    },
    getWelcomeRouter:function(){
        this.resourceRouter.route('/')
            .get(function(req,res){

                res.json(response);

            });

        return this.resourceRouter;
    }
});
module.exports=project;