// 入口文件
console.log('success')
import Vue from 'vue'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

// //导入vuex
import Vuex from 'vuex'
// //注册
Vue.use(Vuex)

//从本地存储读取数据
var car=JSON.parse(localStorage.getItem('car')||'[]')

// //new Vuex.Store（）
var store=new Vuex.Store({
    state:{//this.$store.state.xxx
        car:car//将购物车数据用数组存储，
            // 商品属性：id count price selected（true/false）
    },
    mutations:{//this.$store.commit('xxx','参数')
        addToCar(state, goodsinfo){//加入购物车,并看购物车内是否有对应商品
            //默认认为没有加入过购物车
            var flag=false;

            //要遍历每一项看是否添加过，所以用some，其中不可用if-else结构
            //不需要遍历for each
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    //传过来的是一个字符串
                    item.count +=parseInt(goodsinfo.count)
                    flag=true
                    return true
                }
            }) 
            // 没有添加过
            if(!flag){
                state.car.push(goodsinfo)
            }
            //调用本地存储储存商品信息
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物上显示的值
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count)
                    return true
                }
            })
            //更新到本地缓存
            localStorage.setItem('car',JSON.stringify(state.car))

        },
        removeFormCar(state,id){
            //根据Id删除
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))

        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{//this.$store.getters.xxx
        //相当于计算属性 或 filters
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c +=item.count
            })
            return c;
        },
        getGoodsCount(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.count;
            })
            return o;
        },
        getGoodsSelected(state){
            var o={}
            state.car.forEach(item=>{
                o[item.id]=item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o={
                count:0,//选中的数量
                amount:0//选中的总价
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count +=item.count
                    o.amount +=item.price*item.count
                }
            })
            return o
        }
    }
})

//导入时间插件
import moment from 'moment'
//定义全局过滤器,过滤的是管道符 | 前面的参数
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
   //产参了，否则是当前时间
    return moment(dataStr).format(pattern) 
})

//2.1导入vue-resource
// import VueResource from 'vue-resource'
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)

// 3.设置请求根路径,要放在vue-resource之后
Vue.http.options.root='http://www.liulongbin.top:3005';
// 全局设置post表单数据格式
Vue.http.options.emulateJSON=true;



//导入MUI样式,已经在lib中了
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入mint组件
// import {Header} from 'mint-ui'
// import { Swipe, SwipeItem } from 'mint-ui';
// import { Header,Swipe, SwipeItem ,Button,Lazyload} from 'mint-ui';
// //注册MINT组件
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(Button.name, Button);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.use(Lazyload);
//mint-ui全部加载
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入图片预览插件
// //引入veu-preview
import VuePreview from 'vue-preview'
//使用vue-preview
Vue.use(VuePreview)

//导入自己的路由模块router.js
import router from './router.js'

//导入App根组件
import app from './App.vue'

var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    // 1.4挂载路由到VM实例
    router,
    store//挂载store状态管理对象
    
})