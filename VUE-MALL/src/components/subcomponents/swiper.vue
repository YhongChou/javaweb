<template>
    <div>
         <mt-swipe :auto="4000">
             <!-- 谁谁用这个子组件，则父组件应向这个组件传值来设置lunbotuLis -->
            <mt-swipe-item v-for="item in lunbotuList" :key=item.id>
                <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
            <!-- <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item> -->
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;

    .mint-swipe-item{
        text-align: center;
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
            // width:100%;
            height:100%;
        }
    }
}

.full{
    width:100%;
}
</style>