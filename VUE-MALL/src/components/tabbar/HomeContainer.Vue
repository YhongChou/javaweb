<template>
    <div>
        <!-- 轮播图区 -->
        <!-- <mt-swipe :auto="4000">
            <!-- 是id还是url 看报错结果 谁才是唯一标识 -->
            <!-- <mt-swipe-item v-for="item in lunbotuList" :key=item.id>
                <img :src="item.img" alt="">
            </mt-swipe-item> -->
            <!-- <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item> -->
        <!-- </mt-swipe> --> 

        <!-- 导入轮播图子组件 -->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

        

        <!-- 六宫格 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <!-- 将链接改造为路由 -->
                    <!-- <a href="#"> -->
                    <router-link to=/home/newslist>
                        <!-- <span class="mui-icon mui-icon-home"></span> -->
                        <img src="../../images/menu1.png" alt="">
                        <div class="mui-media-body">News</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photolist">
                        <!-- <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span> -->
                         <img src="../../images/menu2.png" alt="">
                        <div class="mui-media-body">Photos</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/goodslist">
                        <!-- <span class="mui-icon mui-icon-chatbubble"></span> -->
                        <img src="../../images/menu3.png" alt="">
                        <div class="mui-media-body">Shop</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="#">
                      <!-- <span class="mui-icon mui-icon-gear"></span> -->
                      <img src="../../images/menu4.png" alt="">
                      <div class="mui-media-body">Blog</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <!-- <span class="mui-icon mui-icon-search"></span> -->
                        <img src="../../images/menu5.png" alt="">
                        <div class="mui-media-body">Video</div>
                    </a></li>
               <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                   <a href="#">
                        <!-- <span class="mui-icon mui-icon-info"></span> -->
                        <img src="../../images/menu6.png" alt="">
                        <div class="mui-media-body">About Us</div>
                    </a></li>
            </ul> 
		</div>

        <!-- <h3>HomeContainer</h3> -->
    </div>
</template>
 
<script>
import { Toast } from "mint-ui";
import  swiper from '../subcomponents/swiper.vue'

export default {
    data(){
        return{
            //保存获取的轮播图
            lunbotuList:[]
        };
    },
    created(){
        this.getLunbotu();
    },
    methods:{
        getLunbotu(){
            //获取轮播图
            this.$http.get("api/getlunbo").then(result=>{
                // console.log(result.body);
                if(result.body.status===0){
                    this.lunbotuList=result.body.message;
                  
                }else{
                    //获取失败
                    Toast('fail to achieve');
                }
                
            });
        }
    },
    components:{
        swiper
    }
};
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;

    .mint-swipe-item{
        // &:nth-child(1){
        //     background-color: palevioletred;
        // }
        // &:nth-child(2){
        //     background-color:yellowgreen;
        // }
        // &:nth-child(3){
        //     background-color: blueviolet;
        // }
        img{
            width:100%;
            height:100%;
        }
    }
}

//六宫格ul的样式
.mui-grid-view.mui-grid-9{
    background-color: #fff;
    // border: none;
    img{
        width: 60px;
        height:60px;
    }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>

