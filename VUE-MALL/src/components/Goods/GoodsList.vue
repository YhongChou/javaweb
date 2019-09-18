<template>
    <div class="goods-list">
        <!-- 1、用router-link实现网页跳转 -->
        <!-- <router-link class="goods-item" v-for="item in goodslist" 
            :key="item.id" :to="'/home/goodsinfo/'+item.pageindexid"
            tag="div">
            <img 
            :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quality}}</span>
                </p>
            </div>
        </router-link> -->
 
        <div class="goods-item" v-for="item in goodslist" 
            :key="item.id" @click="goDetails(item.id)">
            <img 
            :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>

        </div>


        <!-- <div class="goods-item">
            <img 
            src="../../images/news3.jpg" alt="">
            <h1 class="title">莫得感情的兔子莫得感情的兔子莫得感情的兔子莫得感情的兔子莫得感情的兔子莫得感情的兔子莫得感情的兔子</h1>
            <div class="info">
                <p class="price">
                    <span class="now">1只</span>
                    <span class="old">2只</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余多少</span>
                </p>
            </div>
        </div> --> -->

        <!-- 加载更多 -->
        <mt-button type="danger" size="large" @click="getMore">More</mt-button>
    </div>
</template>

<script>
export default {
    //在组件内部，挂载的是私有数据
    data(){
       return{ 
            pageindex:1,//商品页数，默认是第一页
            goodslist:[]//存放获取到的商品列表
        }

    },
    created(){
        this.getGoodslist();
    },
    methods:{
        getGoodslist(){
            this.$http.get("api/getgoods?pageindex="+this.pageindex)
                .then(result=>{
                    // this.goodslist=result.body.message;     
                    //拼接评论       
                    this.goodslist=this.goodslist.concat(result.body.message);            
             })
        },
        getMore(){
            this.pageindex++;
            this.getGoodslist();

        },
        goDetails(id){
            // 用商品的Id作为每个商品的标识
            console.log(this)
            // this.$router.push("'/home/goodsinfo/'+id")
            // 2.传递对象
            this.$router.push({path:"/home/goodsinfo/"+id});
            // 3.传递命名的路由
            // this.$router.push({name:"goodsinfo",params:{id}});

        }
    }
}
    

</script>
<style lang="scss" scoped>
.goods-list{
    display: flex;//流水布局 换行布局 两列布局的实现 +
    flex-wrap: wrap;

    padding: 7px;//间距 +
    justify-content: space-between;

    .goods-item{
        width: 49%;
        border:1px solid #cccccc;
        box-shadow: 0 0 5px #cccccc; 
        margin: 3px 0;
        padding: 2px;

        //也可以通过设置盒子的相对+绝对定位+底部边距来设置 +
        display: flex;
        flex-direction: column;//改变主轴 +
        justify-content: space-between;


        min-height: 293px;
        img{
            width:100%
        }
        .title{
            margin: 2px;
            font-size:14px;
        }
        .info{
            p{
                margin: 0;
                padding: 5px ;
                background-color:#f8f6f6;
            }// margin: 2px;
            
            .price{
                .now{
                    font-size: 16px;
                    font-weight: bold;//加粗
                    color: palevioletred;   
                };
                .old{
                    text-decoration: line-through;//贯穿线
                    font-size:12px;
                    margin-left: 30px; 
                }
                    
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style> 