<template>
    <div>
        <!-- <h3>图片列表</h3> -->

        <!-- 顶部滑动条 -->
			<div id="slider" class="mui-slider ">
				<div id="sliderSegmentedControl"
                     class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id==0?'mui-active':'']"
                        v-for="item in cates" :key="item.id" 
                        @click="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
						<!-- <a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
							推荐
						</a> -->
						
					</div>
				</div>

			</div>

        <!-- 图片列表 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" 
                :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
	
    </div>

</template>

<script>
//要使用滚动条效果，就需要导入这些文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
    data(){
        return{
            cates:[],//所有图片分类
            list:[]//某一类的图片
        };
    },
    created(){
        this.getAllCategory();
        //默认进入第一页，也就是 全部 这个分类
        this.getPhotoListByCateId(0);
    },
    mounted(){//页面渲染会会执行这个函数
             // 所以在页面渲染好之后要操作元素，最好在这个钩子函数中进行操作
        mui('.mui-scroll-wrapper').scroll({
            deceleration:0.0005
        });
    },
    methods:{
        getAllCategory(){
            //获取所有图片分类
            this.$http.get('api/getimgcategory').then(result=>{
               if(result.body.status===0){
                   //拼接 全部 这个分类
                   result.body.message.unshift({
                        title:"全部",
                        id:0
                    })
                    this.cates=result.body.message;
               }
                    

               
            })
        },
        getPhotoListByCateId(cateId){
            //获取某一类图片
            this.$http.get("api/getimages/"+cateId).then(result=>{
                if(result.body.status===0){
                    this.list=result.body.message;
                }else{
                   Toast("fail to achieve");
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
*{
    touch-action: pan-y;//提升流畅度
}

.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    
    li{
        background-color: #cccccc;
        text-align: center;
        //每张图片之间有一个间距
        margin-bottom: 10px;
        box-shadow: 0 0 6px #999;
        position: relative;
        img{ 
            width: 100%;
            vertical-align: middle;
        }

        //懒加载图片，
        img[lazy="loading"]{
            width: 40px;
            height: 300px;
            margin: auto;
        }

        .info{
            color:white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,0.4);
            max-height: 54px;

            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
    

}


</style>

