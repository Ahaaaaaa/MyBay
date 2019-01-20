const express = require('express');
const mysql = require('mysql');
const nodeExcel = require('excel-export');
const dbConfig = require('./conf');
const userSql = require('./users.sql');
const router = express.Router();
const pool = mysql.createPool(dbConfig);

/* GET users listing. */
router.get('/sign', function (req, res) {
    const param = req.query;
    pool.query(userSql.getUserById, [param.uid], function (error, results) {
        if (results.length > 0) {
            res.send({status: 200, body: '已报名成功'});
        } else {
            pool.query(userSql.insert, [param.uid, param.nickname, param.avatarUrl, param.phone, param.namespace], function (error) {
                if (error) throw error;
                // res.send('respond with a resource');
                res.send({status: 200, body: '报名成功'});
            });
        }
    })
});

router.get('/queryAllByNamespace', function (req, res) {
    const param = req.query;
    pool.query(userSql.queryAllByNamespace, [param.namespace], function (error, result) {
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
            {caption: '用户名', type: 'string'},
            {caption: '头像', type: 'string'},
            {caption: '手机号', type: 'string'},
            {caption: '报名地址', type: 'string'}
        ];
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment;");
        res.attachment(param.namespace + '报名名单.xlsx');
        res.end(nodeExcel.execute(conf), 'binary');
    })
});

module.exports = router;
