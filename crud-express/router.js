var fs=require('fs')
var Student=require('./student')
// module.exports=function(app){
//     // 方法
//     app.get('/',function (req,res) {
//         fs.readFile('./db.json','utf8',function (err,data) {
//             if(err){
//                 return res.status(500).send('server error')
//             }
//             // console.log(data)
//             //字符串转对象
//             var students=JSON.parse(data).students
//             res.render('index.html',{
//                 fruits:[
//                     '苹果',
//                     '香蕉',
//                     '西红柿'
//                 ],
//                 students: students
//             })
//         })
//         // res.send('hello world')
//     })
//
//     app.get('/students',function (req,res) {
//
//     })
//     app.get('/students/new',function (req,res) {
//
//     })
//     app.get('/students/new',function (req,res) {
//
//     })
//     app.get('/students',function (req,res) {
//
//     })
//     app.get('/students',function (req,res) {
//
//     })
//     app.get('/students',function (req,res) {
//
//     })
// }

//测试更新学生信息
// Student.updateById({
//     id:1,
//     name:'张小三',
//     age:19
// },function (err) {
//     if(err){
//         return console.log('修改失败')
//     }
//     console.log('修改成功')
// })

//进一步写:
var express=require('express')
// 1. 创建一个路由容器
var router=express.Router()

// 2. 把路由都挂载到 router 路由容器中
//渲染首页
router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '橘子'
            ],
            students: students
        })
    })
})

//渲染添加学生页面
router.get('/students/new',function (req,res) {
    res.render('new-students.html')
})

//处理添加学生
// 1. 获取表单数据
// 2. 处理
//    将数据保存到 db.json 文件中用以持久化
// 3. 发送响应
router.post('/students/new',function (req,res) {
// console.log(req.body)
    Student.save(req.body,function (err) {
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

//渲染编辑学生页面
router.get('/students/edit',function (req,res) {
//id在查询字符串中，用req.query获取
//     console.log(req.query.id)

    //将id字符转化为数字
    Student.findById(parseInt(req.query.id),function (err,student) {
        if(err){
            return res.status(500).send('Server error.')
        }
       // console.log(student)

        res.render('edit.html',{
            student:student
        })
    })
})

//处理编辑学生
router.post('/students/edit',function (req,res) {
    // console.log(req.body)
    Student.updateById(req.body,function (err) {
        if(err){
            return res.status(500).send('Server error.')
        }
        // console.log(student)
        // res.render('/students')
        res.redirect('/students')

    })
})
//处理删除学生
router.get('/students/delete',function (req,res) {

    // console.log(req.query.id)

    //成功null 失败一个对象
    Student.deleteById(req.query.id,function (err) {
        if(err){
            return res.status(500).send('Server error.')
        }
        //刷新看到最新数据
        res.redirect('/students')
    })
})
// 3. 把 router 导出
module.exports=router