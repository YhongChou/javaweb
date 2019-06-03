var mongoose=require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/itcast')

var Schema=mongoose.Schema

var studentSchema=new Schema({
    name:{
      type:String,
      required:true
    },
    gender:{
      type:Number,
      enum:[0,1],//枚举，值必须从enum数组中选
      default:0
    },
    age:{
      type:Number
    },
    hobbies:{
      type:String
    }
})

//导出模型构造函数
mongoose.model('Student',studentSchema)