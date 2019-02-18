var express = require('express');
const request = require('request');
var router = express.Router();

router.get('/user/getUserInfo',function(req,res){
    console.log('hello')
    const baseUrl = req.query.env||'http://core.zuolin.com';
    request(baseUrl+'/evh/user/getUserInfo?'+req.url.split('?')[1], function (error, response, body) {
        body = JSON.parse(body).response;
        res.send({status:200,body})
    });
})

module.exports = router;