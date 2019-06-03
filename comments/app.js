var http=require('http')
var fs=require('fs')
var url=require('url')
//注意模板引擎需要安装
var template=require('art-template')

var comments = [
    {
        name: 'a',
        message: '今天天气不错！',
        dateTime: '2019-1-16'
    },
    {
        name: 'b',
        message: '今天天气不错！',
        dateTime: '2019-1-16'
    },
    {
        name: 'c',
        message: '今天天气不错！',
        dateTime: '2019-1-16'
    },
    {
        name: 'd',
        message: '今天天气不错！',
        dateTime: '2019-1-16'
    },
    {
        name: 'e',
        message: '今天天气不错！',
        dateTime: '2019-1-16'
    }
]

// var server = http.createServer()
//server.on(),server.listen()
http
    .createServer(function (req,res) {
        //使用url.parse方法将路径解析为对象,区分url和parseObj
        var parseObj=url.parse(req.url,true)
        // var url=req.url
        // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
        var pathname=parseObj.pathname
        if(pathname==='/'){
            fs.readFile('./views/index.html',function (err,data) {
                if(err){
                    return res.end('404 Not Found')
                }
                var htmlStr=template.render(data.toString(),{
                    comments:comments
                })
                res.end(htmlStr)
            })

        //    控制哪些资源能被用户访问，哪些资源不能被用户访问
        }else if(pathname.indexOf('/public/')===0){

            // console.log()
            fs.readFile('.'+pathname,function (err,data) {
                if(err){
                    return res.end('404 Not Found')
                }
                //data 是调用后文件中可以显示的内容
                res.end(data)

            })
        }else if(pathname==='/post'){
            fs.readFile('./views/post.html',function (err,data) {
                if(err){
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        }else if(pathname==='/comments'){
            // console.log('收到表单请求了',parseObj.query)

            //一次请求只对应一次响应
            var comment=parseObj.query
            comment.dateTime='2019-1-16'
            // comments.push(comment)
            //从前面进入
            comments.unshift(comment)
            // 此时，服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了
            // 服务器让客户端重定向
            res.statusCode=302
            res.setHeader('Location','/')
            res.end()

        }
        else {
            fs.readFile('./views/404.html',function (err,data) {
                if(err){
                    return res.end('404 Not Found')
                }
                res.end(data)
                // console.log(data.toString())
            })
        }
    })

    .listen(5000,function () {
        console.log('server is running...')
    })
