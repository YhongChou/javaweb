<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 小标题 -->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time|dateFormat}}</span>
            <span>点击次数：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容 -->
        <div class="content" v-html="newsinfo.content"></div>
        <!-- 评论区 -->
        <comment-area :id="this.id"></comment-area>
    </div>
</template>

<script>
//导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
            //将id值挂载到data
            id:this.$route.params.id,
            newsinfo:{}//具体的新闻对象
        };
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){//获取新闻详情
            this.$http.get("api/getnew/"+this.id).then(result=>{
                if(result.body.status===0){
                    this.newsinfo=result.body.message[0];
                }else{
                    Toast('fail to achieve')
                }
            })
        }
    },
    components:{//注册子组件
        "comment-area":comment
    }

};
</script>

<style lang="scss">
.newsinfo-container{
    // 总体左右边距
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        //标题的上下边距
        margin :15px 0;
        color:black;
    }
    .subtitle{
         font-size: 13px;

        //左右对齐
        display: flex;
        justify-content: space-between;

        color: palevioletred;
    }
    .content{
        width: 100%;
    }
}
</style>