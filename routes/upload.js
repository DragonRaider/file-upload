const multer = require("multer");
const _ = require("lodash");
const fs = require("fs");

var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json')

var upload = multer({ dest: './public/images' });

router.post("/",upload.single("images"),(req,res)=>{
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});
    let uploadParams = {Bucket: 'pocketdoc', Key: '', Body: ''};
    var filepath = req.file.path;
    console.log(filepath);
    var fileStream = fs.createReadStream(filepath);
    fileStream.on('error',(err)=>{
        console.log(err);
    });
    var temp = req.file.originalname.split(".");
    var name = _.dropRight(temp).join(".");
    var extension = _.last(temp);
    var name = name+"-"+Date.now()+"."+extension;

    var temp1 = filepath.split("/");
    var path = _.dropRight(temp1).join("/");
    uploadParams.Body = fileStream;
    uploadParams.Key = path+"/"+name;
    
    s3.upload(uploadParams,(err,data)=>{
        if(err){
            res.render("error",{message:"Sorry Could Not Upload the Images"});
        }if(data){
            res.render("success");
            fs.unlink(filepath,(err)=>{
                if(err){
                    console.log("Couldn't delete the File");
                }
            });
        }
    })
})

module.exports = router;
