var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: '活动报名' });
    console.log(req.searchParams);
    res.send({status:200,body:'success'});
});

module.exports = router;
