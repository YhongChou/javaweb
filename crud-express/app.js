//引包
var express = require('express')
var fs=require('fs')
var router=require('./router')
var bodyParser=require('body-parser')
var app = express()

//开放资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

//配置模板引擎
app.engine('html', require('express-art-template'))

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// router(app)
//挂载路由
app.use(router)

//监听
app.listen(3000,function () {
    console.log('running')
})
module.exports=app

