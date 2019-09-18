<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" 
        @change="countChanged" ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
    mouted(){
        //初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods:{
        countChanged(){//文本框数据改变就传值给父组件
        //数量值改变就同步更新购物车中的商品数
            this.$store.commit("updateGoodsInfo",{
                id:this.goodsid,
                count:this.$refs.numbox.value

            })
        }
    },
    props:["initcount","goodsid"],
}
</script>

<style lang="scss" scoped>

</style>