const multer = require("multer");
const _ = require("lodash");
var express = require('express');
var router = express.Router();

var storage = multer.diskStorage({
    destination:(req,file,callback)=>{
      callback(null,"./public/images");
    },
    filename:(req,file,callback)=>{
      var temp = file.originalname.split(".");
      var name = _.dropRight(temp).join(".");
      var extension = _.last(temp);
      console.log(name);
      callback(null,name+"-"+Date.now()+"."+extension);
    }
});

var upload = multer({storage:storage}).array("images");

router.post("/",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
            res.render("error",{message:"Sorry Could Not Upload the Images"});
        }
        res.render("success");
    });
})

module.exports = router;
