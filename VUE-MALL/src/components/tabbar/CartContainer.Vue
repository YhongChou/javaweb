<template>
    <div class="shopcar-container">
        <!-- <h3>CartContainer</h3> -->
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch 
                            v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <!-- <img src="../../images/news1.jpg"> -->
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">{{item.sell_price}}</span>
                                <numbox :initcount=" $store.getters.getGoodsCount[item.id] " :goodsid="item.id"></numbox>
                                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                                
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a> 
                            </p>
                        </div>
                    </div>              
                </div>
            </div>
        </div>

        <!-- 结算 -->
        
            <div class="mui-card" >
                <div class="mui-card-content">
                    <div class="mui-card-content-inner jiesuan">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，
                                总价<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>  
                    </div>     
                           
                </div>
                
            </div>
            <p>{{$store.getters.getGoodsSelected}}</p>
        </div>

</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
    data(){
        return {
            goodslist:[]
        };
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        //所有数据都在store的car中
        getGoodsList(){
            var idArr=[]
            this.$store.state.car.forEach(item => {
                idArr.push(item.id)
            });
            //购物车没有数据则无需请求
            if(idArr.length<=0){
                return;
            }
            this.$http
                .get("api/goods/getshopcarlist/" +idArr.join(','))
                .then(result=>{
                    if(result.body.status===0){
                        this.goodslist=result.body.message;
                    }
                });
            
        },
        //删除商品，根据id删除，值依然从store中传过来
        remove(id,index){
            this.goodslist.splice(index,1);
            this.$store.commit("removeFormCar",id);
        },
        selectedChanged(id,val){
            //开关状态同步到state
            //获取状态
            //console.log(id+'---'+val)
            this.$store.commit('updateGoodsSelected',{id,selected:val})
        }
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color:white;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items:center;
            }
            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 14px
            }
            .info{
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan{
           display: flex;
           justify-content: space-between;
           align-items: center; 
           .red{
               color: red;
               font-weight: bold;
               font-size: 16px
           }
        }
    }
</style>

