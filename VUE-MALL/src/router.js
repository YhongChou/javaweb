import VueRouter from 'vue-router'

//1.5导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import CartContainer from'./components/tabbar/CartContainer.vue'
import SearchContainer from'./components/tabbar/SearchContainer.vue'
import NewsList from './components/News/NewsList.vue'
import NewsInfo from './components/News/NewsInfo.vue'
import PhotoList from './components/Photos/PhotoList.vue'
import PhotoInfo from './components/Photos/PhotoInfo.vue'
import GoodsList from './components/Goods/GoodsList.vue'
import GoodsInfo from './components/Goods/GoodsInfo.vue'
import GoodsDesc from './components/Goods/GoodsDesc.vue'
import GoodsComment from './components/Goods/GoodsComment.vue'


// 1.3 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    // 路径要对应
    { path:'/home',component:HomeContainer},
    { path:'/member',component:MemberContainer},
    { path:'/cart',component:CartContainer},
    { path:'/search',component:SearchContainer},
    { path:'/home/newslist',component:NewsList},
    { path:'/home/newsinfo/:id',component:NewsInfo},
    { path:'/home/photolist',component:PhotoList},
    { path:'/home/photoinfo/:id',component:PhotoInfo},
    { path:'/home/goodslist',component:GoodsList},
    { path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
    { path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
    { path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'}


  ],
  linkActiveClass:'mui-active'//覆盖默认的路由高亮类
})

// 把路由对象暴露出去
export default router