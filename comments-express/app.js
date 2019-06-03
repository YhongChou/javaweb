//引包
var express = require('express')
var bodyParser=require('body-parser')
var app = express()

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

//配置模板引擎
app.engine('html', require('express-art-template'))
// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var comments = [{
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
},
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]

app.get('/', function (req, res) {
    res.render('index.html', {
        comments: comments
    })
})

app.get('/post', function (req, res) {
    res.render('post.html')
})

//同一个路径可以请求多次，因为用了不同的请求方法
app.post('/post', function (req, res) {
    //req.query只能拿get请求参数
    // console.log(req.query)//没有响应，不适用

    // console.log('收到表单post请求了')

    console.log(req.body)
    // var comment = req.query
    var comment = req.body
    comment.dateTime = '2017-11-5 10:58:51'
    comments.unshift(comment)
    res.redirect('/')
})

app.listen(3000, function () {
    console.log('running...')
})
