<template>


    <div>
		<!-- 特有的header 怎么代替Header呢 -->
		   <!-- <mt-header title="News"> -->
      			<!-- <router-link to="/" slot="left"> -->
        <!-- class="mui-action-back mui-icon mui-icon-left-nav nui-pull-left " -->
					<!-- <mt-button icon="back"></mt-button> -->
				  <!-- </router-link> -->
         			<!-- <mt-button icon="more" slot="right"></mt-button> -->
    		<!-- </mt-header> -->

        <!-- <h3>新闻资讯</h3> -->
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist"
					:key="item.id">
					<router-link :to="'/home/newsinfo/'+ item.id">
						<img class="mui-media-object mui-pull-left" 
						:src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
								<span>发表时间：{{item.add_time | dateFormat}}</span>
								<span>点击：{{item.click}}次</span>
							</p>
						</div>
					</router-link>
				</li>
				<!-- <li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../images/news2.jpg">
						<div class="mui-media-body">
							<h1>柴老哥</h1>
							<p class='mui-ellipsis'>
								<span>发表时间：2019-1-1 13：13：13</span>
								<span>点击：2次</span>
							</p>
						</div>
					</a>
				</li> -->

	
				

			</ul>
    </div>
</template>

<script>
import{Toast}from "mint-ui";

export default {
	data(){
		return{
			newslist:[]//新闻资讯
		};
	},
	//在生命周期函数created中调用
	created(){
		this.getNewsList();
	},
	methods:{
		getNewsList(){//获取新闻列表
			this.$http.get('api/getnewslist').then(result=>{//指定访问结果
				if(result.body.status===0){
					//没有失败，获取数据，并保存到data上
					this.newslist=result.body.message;
				}else{
					//获取失败则弹出消息
					Toast('fail to achieve')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.mui-table-view{
	li{
		h1{font-size: 14px;}
		.mui-ellipsis{
			font-size: 12px;
			color:palevioletred;
			// 两端对齐，c3方法，c2呢？
			display: flex;
			justify-content: space-between;
		}
		
	}
}
</style> 