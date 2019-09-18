<template>
    <div class="cmt-container">
        <h3>留言评论</h3>
        <textarea placeholder="留下你的想法，不少于10个字o(*￣▽￣*)o" 
            maxlength='200' v-model="msg"></textarea>
       <!--  size:small large normal -->
        <mt-button type="primary" size="large" @click="postComment">发表</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    <span>#{{i+1}}&nbsp;&nbsp;</span>
                    <span>{{item.user_name}}&nbsp;&nbsp;</span>
                    <span>{{item.add_time|dateFormat}}</span>
                </div>
                <div class="cmt-body">
                    {{item.content==='undefinded'?'我没有评论':item.content}}
                </div>
            </div>
            <!-- <div class="cmt-item">
                <div class="cmt-title">
                    第一楼&nbsp;&nbsp;用户：超级萌小兔&nbsp;&nbsp;2019-2-2 14：14
                </div>
                <div class="cmt-body">
                    新闻写得真好
                </div>
            </div>
            <div class="cmt-item">
                <div class="cmt-title">
                    第一楼&nbsp;&nbsp;用户：超级萌小兔&nbsp;&nbsp;2019-2-2 14：14
                </div>
                <div class="cmt-body">
                    新闻写得真好
                </div>
            </div> -->
        </div>
       
       <!-- plain 中空 -->
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>
    
</template>

<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            pageIndex:1,//默认展示第一页数据
            comments:[],//所有评论
            msg:''//填写的评论的内容
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http
                .get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex)
                .then(result=>{
                    if(result.body.status===0){
                        // this.comments=result.body.message;
                        //拼接数据
                        this.comments=this.comments.concat(result.body.message)
                    }else{
                        Toast("fail to achieve");
                    }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            // 校验msg是否为空
            if(this.msg.trim().length===0){
                return Toast("comment is empty")
            }
            // 发表评论
            this.$http
                .post("api/postcomment/"+this.$route.params.id,{
                    content:this.msg.trim()
                })
                .then(function (result) {
                    if(result.body.status===0){
                        //返回且拼接评论
                        var cmt={
                            user_name:'匿名用户',
                            add_time:Date.now(),
                            content:this.msg.trim()
                        };
                        this.comments.unshift(cmt);
                        this.msg="";//清空msg
                    }else{
                        return Toast("fail to achieve")
                    }
                }

                )
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 16px;
        color: palevioletred;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 2px;
    }

    .cmt-list{
         margin: 2px 0px;//上下 左右
        .cmt-item{
            font-size: 13px;
            
            .cmt-title{               
                line-height: 36px;
                background-color: pink;
                text-indent: 5px;
                display: flex;
                justify-content: space-between
                
            }
            .cmt-body{
                line-height: 36px;
                text-indent: 5px;
                

            }
        }
    }
}
</style>