/*
student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 *
 * 这里才是我们学习 Node 的精华部分：奥义之所在
 * 封装异步 API
 */
var fs=require('fs')
var dbPath='./db.json'
/*
获取学生列表
 */
exports.find=function (callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if(err){
            return callback(err)
        }
        //得到数组列表
        callback(null,JSON.parse(data).students)
    })
}

exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',function (err,data) {
        if(err){
            return callback(err)
        }
        //得到单个学生
        var students=JSON.parse(data).students
        var ret=students.find(function (item) {
            // return item.id===id
            return item.id===parseInt(id)
        })
        callback(null,ret)
        console.log(id)
    })
}


// find(function (err,data) {
//
// })
/*
添加保存学生
 */
exports.save=function (student,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        //让id不重复
        student.id=students[students.length-1].id+1

        //将传递的对象保存到数组
        students.push(student)
        //对象转为字符串，并写入文件
        var fileData=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function (err) {
            if(err){
                return callback(err)
            }
            //成功就不需要返回什么，返回Null
            callback(null)
        })
    })
}
/*
根据id 获取学生信息对象,更新学生
 */
exports.updateById=function (student,callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        //将id统一转换为数字
        student.id=parseInt(student.id)

        //根据id找出要修改的
        //es6中的一个数组方法，当找到符合条件的对象时，终止遍历
        var stu = students.find(function (item) {
            // return item.id === student.id
            // return item.id===parseInt(student.id)
            return item.id === student.id
        })
        //覆盖原来的内容
        // stu.name = student.name
        for (var key in student) {
            stu[key] = student[key]
        }
        //把对象转换为字符串
        var fileData=JSON.stringify({
            students:students
        })
        //将字符串保存到文件
        fs.writeFile(dbPath,fileData,function (err) {
            if(err){
                return callback(err)
            }
            //成功就不需要返回什么，返回Null
            callback(null)
        })

    })
}
    // undateById({
    //     id:1,
    //     name:'xxx',
    //
    // })

//删除学生
exports.deleteById=function (id,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students

    //    find找到对象，findIndex根据条件查找元素的下标
    //    注意元素的类型
        var deleteId = students.findIndex(function (item) {
            return item.id===parseInt(id)
        })

        //根据下标从数组中删除对应的学生对象
        students.splice(deleteId,1)

        //把对象转换为字符串
        var fileData=JSON.stringify({
            students:students
        })
        //将字符串保存到文件
        fs.writeFile(dbPath,fileData,function (err) {
            if(err){
                return callback(err)
            }
            //成功就不需要返回什么，返回Null
            callback(null)
        })
    })
}