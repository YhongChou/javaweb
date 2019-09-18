<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
            <span>点击：{{photoinfo.click}}</span>
        </p>

        <hr>

        <!-- 缩略图区 -->
        <img  class="preview-img" v-for="(item,index) in list"  
        :key="item.src" :src="item.src" 
        height="100" @click="$preview.open(index,list)">
        


        <!-- 图片内容 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论区 -->
        <!-- 3.使用子组件 -->
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>

<script>
//1.导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
            id:this.$route.params.id,//从路由中获取的图片ID
            photoinfo:{},//图片详情
            list:{},//缩略图
        };
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        getPhotoInfo(){
            //获取图片详情
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.photoinfo=result.body.message[0]
                }
            });
        },
        getThumbs(){
            //获取缩略图
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(item=>{
                        //给item添加属性，补全宽高，才可使用vue-preview插件
                        item.w=600;
                        item.h=400;
                    });
                    //保存message
                    this.list=result.body.message;
                }
            })
        }
    },
    components:{//2注册子组件
        'cmt-box':comment
    }
}
</script>

<style lang="scss"scoped>
.photoinfo-container{
    padding: 2px;
    h3{
        color: palevioletred;
        font-size: 16px;
        text-align: center;
        margin: 12px 0;//上下 左右
    }
    .subtitle{
        display: flex;//弹性盒模型
        justify-content: space-between;
        font-size: 13px;
        margin: 0 2px;
    }
    .content{
        font-size: 14px;
        line-height: 30px;
    }
}
</style>