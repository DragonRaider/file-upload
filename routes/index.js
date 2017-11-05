var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/aws',(req,res)=>{
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  s3.listBuckets((err,data)=>{
    if(err){
      console.log(err);
    }else{
      console.log(data.Buckets);
      res.send("success");
    }
  });

});



module.exports = router;
