<template>
    

    <div class="goodsinfo-container">      
        <transition 
           @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

            <!-- 轮播图区 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <!-- 导入轮播图组件 -->
                         <swiper :lunbotuList="lunbotu" :isfull="false"> </swiper>
					</div>
				</div>
			</div>

            <!-- 购买区 -->
			<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p class="price">
                            销售价:<span class="now_price">{{goodsinfo.sell_price}}</span>&nbsp;&nbsp;
                            市场价：<del>{{goodsinfo.market_price}}</del>
                            
                        </p>
                        <p>购买数量：
                            <numbox @getcount="getSelectedCount" 
                            :max="goodsinfo.stock_quantity">
                            </numbox>
                        </p>                                                 
                        <p> 
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
                    </div>
				</div>
				<div class="mui-card-footer"></div>
			</div>

            <!-- 商品参数区 -->
            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存：{{goodsinfo.stock_quantity}}&nbsp;&nbsp;件</p>
                        <p>上架时间：{{goodsinfo.add_time |dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                     <mt-button type="primary" size="large" plain @click="goDesc(id)">详情</mt-button>
                     <mt-button type="danger" size="large" plain @click="goComment(id)">评论</mt-button>
                      
                </div>
			</div>
    
    </div>
</template>

<script>
import  swiper from '../subcomponents/swiper.vue'
import numbox from './goodsinfo_numberbox.vue'

export default {
    data(){
        return{
            id:this.$route.params.id,//将路由参数对象中的id挂载到data
            lunbotu:[],//轮播图
            goodsinfo:{},//商品信息
            ballFlag:false,//购物车角标
            selectedCount:1//选中的商品数量
        };
    },
    created(){
        this.getLunBotu(),
        this.getGoodsInfo();
    },
    methods:{
        getLunBotu(){
            this.$http.get("api/getthumimages/"+this.id).then(result=>{
                if(result.body.status===0){
                    //lunbotu中只有src属性,循环遍历，为item添加img属性
                    result.body.message.forEach(item=>{
                        item.img=item.src;
                    })
                    this.lunbotu=result.body.message;
                }
            })
        },
        getGoodsInfo(){
            //获取商品信息
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status===0){
                     this.goodsinfo=result.body.message[0];
                }
               
            })
        },
        //用编程式导航编写 详情 页面
        goDesc(id){
            this.$router.push({name:"goodsdesc",params:{id} });
        },
        //用编程式导航编写 评论 页面
        goComment(id){
            this.$router.push({name:"goodscomment",params:{id} });

        },
        addToShopCar(){//控制球的显示和隐藏
            this.ballFlag=!this.ballFlag;
            //保存到store的car中
            var goodsinfo={
                id:this.id,
                count:this.selectedCount,
                price:this.goodsinfo.sell_price,
                selected:true,
            }
            //调用store中的mutations 将商品加入购物车
            this.$store.commit("addToCar",goodsinfo);
        },
        beforeEnter(el){//摆正位置
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;

            //动态获取小球的位置,ref只能获取组件内部的元素
            const ballPosition=this.$refs.ball.getBoundingClientRect();
            //获取徽标的位置，用dom操作可以获取页面上的任何元素
            const badgePositon=document
                .getElementById("badge").getBoundingClientRect();

            const xDist=badgePositon.left-ballPosition.left;
            const yDist=badgePositon.top-ballPosition.top;

            //字符串拼接，用到ES6模板字符串
            el.style.transform=`translate(${xDist}px,${yDist}px)`;//动画终点
            el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)";//过渡效果
            done()
        },
       afterEnter(el){//小球消失
            this.ballFlag=! this.ballFlag;
        },
        getSelectedCount(count){
            //将选中的商品数量保存都data上
            this.selectedCount=count;
            console.log(this.selectedCount)

        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eeeeee;
    overflow: hidden;
    .now_price{
        color:palevioletred;
        font-size: 16px;
        font-weight: bold;
    }
    // button{
    //     display: flex;
    //     justify-content: space-between;
    // }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width:15px;
        height: 15px;
        border-radius:50% ;
        background-color:red;
        position: absolute;
        z-index:99;
        top:409px;
        left: 149px;
        // transform: translate(88px,210px)

    }
}
</style>