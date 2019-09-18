<template>
  <div class="app-container">
    <!-- 将vue渲染至首页 -->

    <!-- Header -->
    <mt-header fixed class="header" title="Simple Mall">
        <span slot="left" @click="goBack" v-show="flag">
          <mt-button icon="back">返回</mt-button>
        </span>
    </mt-header>

    <!-- router-view -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- Tabbar -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-done" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">Home</span>
			</router-link>
      <router-link class="mui-tab-item-done" to="/member">
				<span class="mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">Account</span>
			</router-link>
      <router-link class="mui-tab-item-done" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"> 
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">Cart</span>
			</router-link>
      
      <router-link class="mui-tab-item-done" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">Search</span>
			</router-link>
    </nav>

   
    <!-- <h1>App大组件</h1> -->
  </div>
</template>

<script>
// 按需导入 Toast 组件
export default{
  data(){
    return {
      flag:false
    };
  },
  created(){
    this.flag=this.$route.path==='/home'?false:true;
  },
  methods:{
    goBack(){
      //点击后退
      this.$router.go(-1)
    }
  },
  watch:{
    "$route.path":function(newVal){
      if(newVal==="/home"){
        this.flag=false;
      }else{
        this.flag=true;
      }
    }
  }
};

</script>

<style lang="scss" scoped>
// 局部样式

.mint-header{
  z-index: 99;
}

//VUE大盒子下移40个像素
.app-container{
  padding-top: 40px;
  padding-bottom: 50px;//防止底部被遮挡
  overflow-x: hidden;//横向超出页面宽度隐藏，不可改y，否则竖滚动条不能滑动
  mt-header{
    background-color: palevioletred;
  }
}

//切换动画
.v-enter{//进入
   opacity: 0;
  transform: translateX(100%)
}


.v-leave-to{//离开
  opacity: 0;
  transform: translateX(-100%);
  position:absolute;
}

.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;
}

.mui-bar-tab .mui-tab-item-done.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-done {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-done .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-done .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

// .mui-bar-tab .mui-tab-item-done{
//     .mui-icon-extra-cart{
     
//     };
// }

</style>
