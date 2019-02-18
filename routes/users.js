const express = require('express');
const mysql = require('mysql');
const nodeExcel = require('excel-export');
const request = require('request');
const dbConfig = require('./conf');
const userSql = require('./users.sql');
const router = express.Router();
const pool = mysql.createPool(dbConfig);

const getUserInfo = function(req,callback){
    const baseUrl = req.query.env==='beta'?'http://opv2test.szbay.com':'http://core.szbay.com';
    console.log(baseUrl);
    request(baseUrl+'/evh/user/getUserInfo?'+req.url.split('?')[1], function (error, response, body) {
        const res = JSON.parse(body).response;
        callback(res)
    });
};
/* GET users listing. */
router.get('/sign', function (req, res) {
    console.log(req.query);
    getUserInfo(req,function (param) {
        pool.query(userSql.getUserById, [param.id], function (error, results) {
            if (results.length > 0) {
                res.send({status: 200, body: '已报名成功'});
            } else {
                pool.query(userSql.insert, [
                    param.id,
                    param.accountName,
                    param.nickName,
                    param.avatarUrl,
                    param.phones[0],
                    param.communityName,
                    req.query.address
                ], function (error) {
                    if (error) throw error;
                    res.send({status: 200, body: '报名成功'});
                });
            }
        })
    });
});


router.get('/queryAll', function (req, res) {
    const param = req.query;
    pool.query(userSql.queryAll, [param.address], function (error, result) {
        if (error) throw error;
        let conf = {};
        conf.rows = [];
        result.map(function (value) {
            delete value.created;
            conf.rows.push(Object.values(value))
        });
        conf.stylesXmlFile = "styles.xml";
        conf.name = "mysheet";
        conf.cols = [
            {caption: 'ID', type: 'number'},
            {caption: '帐号名', type: 'string'},
            {caption: '用户昵称', type: 'string'},
            {caption: '头像', type: 'string'},
            {caption: '手机号', type: 'string'},
            {caption: '报名地址', type: 'string'},
            {caption: '用户所在园区', type: 'string'}
        ];
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment;");
        res.attachment(param.address + '报名名单.xlsx');
        res.end(nodeExcel.execute(conf), 'binary');
    })
});

module.exports = router;
