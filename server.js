var express=require('express'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser');
    fs=require("fs");
var mailer = require("nodemailer");
// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "hasnaa.echhaibi@gmail.com",
        pass: "so9ratn7os"
    }
});
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(env === 'development') {
    mongoose.connect('mongodb://localhost/voyage');
} else {
    mongoose.connect('mongodb://hasnaa:s9ardios@ds031193.mongolab.com:31193/destination');
}

var db=mongoose.connection;
var Question=require("./models/Question");
var Response=require("./models/Response");
var City=require("./models/City");
var app=express();
var port=process.env.PORT||3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public/"));
app.use(bodyParser.json());

app.get('/' , function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(fs.readFileSync('./public/index.html'));
});
app.post('/questions',function(req,res){
    var question =new Question(req.body);
    question.save();
    res.status(201).send({success:true});
});

app.get('/questions',function(req,res){

    Question.find(function(err,data){
        res.status(200).send(data);
    });

});
app.get('/questions/:id',function(req,res){
    var id=req.params.id;
    Question.findById(id,function(err,result){
        res.status(200).send(result);
    });

})
app.get('/responses',function(req,res){
    var questionId=req.query.questionId;
    console.log(questionId);
    Response.find({questionId:questionId},function(err,data){
        res.status(200).send(data);
    });
});
app.post('/responses',function(req,res,next) {
    var response = new Response(req.body);
    response.save(function (err, data) {
        console.log(data);
        if (err)
            next(err);
        else {

            Question.findById(data.questionId, function (err, result) {
                if (err) {
                    next(err);
                }
                else {
                    result.countResponse++;
                    result.save();
                }
            })
            res.status(201).send({success: true});
        }
    });
});

app.get('/cities',function(req,res){

    City.find(function(err,data){
        res.status(200).send(data);
    });

});
app.post('/sendEmail',function(req,res,next){
    console.log(req.body);
    var mail = {
        from: req.body.from,
        to: "hasnaa.echhaibi@gmail.com",
        subject: "Fin bari tamchi",
        text: req.body.from+" "+req.body.name+" "+req.body.text
    };
    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close();
    });
})

app.listen(port,function(){
    console.log('my app is running on PORT:'+port);
})
