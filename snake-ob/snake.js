//一定要保证这个文件下的编码是uft-8,否则复制过来的时候会乱码
//自调用函数，蛇Game
(function(){
    //存放蛇的每个部位（头、身体）
    var elements=[];
    //蛇有宽，高，方向
    function Snake(width,heigth,direction) {
        //蛇的每个部分的宽
        this.width = width || 20;
        this.height = heigth || 20;
        //蛇的身体
        this.body = [
            {x: 3, y: 2, color: "pink"},//头，0，数组body中的每一个元素都是一个对象
            {x: 2, y: 2, color: "blue"},//1
            {x: 1, y: 2, color: "blue"}//此处没有逗号，//2
        ];
        //蛇的方向
        this.direction = direction || "right";
    }
    //为原型添加方法---蛇的初始化
    Snake.prototype.init=function (map) {
        //先删除之前的蛇
        remove();

        //循环遍历创建div
        for(var i=0;i<this.body.length;i++){
            //数组中的每个数组元素都是一个对象
            var obj=this.body[i];
            //创建div
            var div=document.createElement("div");
            //把div加入到map地图中
            map.appendChild(div);
            //设置div样式
            div.style.position="absolute";
            div.style.width=this.width+"px";//20
            div.style.height=this.height+"px";//20
            //横纵坐标
            div.style.left=obj.x*this.width+"px";//随着移动，每一个小方块obj的坐标都不一样
            div.style.top=obj.y*this.height+"px";
            //背景颜色
            div.style.backgroundColor=obj.color;
            //把div加入到elements数组中-----方便后续删除
            elements.push(div);
        }
    };

    //为原型添加方法------蛇都起来
    Snake.prototype.move=function(food,map) {
        //改变小蛇的身体的坐标位置
        var i = this.body.length - 1;//索引值为：0 1 2
        for (; i > 0; i--) {//for(;i>1;i--)，则只有头部移动，body[1]在elements[]中也被清除
            this.body[i].x = this.body[i - 1].x;//向右移动所以减1
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向---改变小蛇的头的坐标位置
        switch (this.direction) {
            case "right"://向右走
                this.body[0].x += 1;//当前头的位置=原来头的位置+1
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        //判断有没有吃到食物
        //蛇的头的坐标和食物的坐标一致
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        if(headX==food.x&&headY==food.y){
            //获取小蛇的最后的尾巴的坐标
            var lastBody=this.body[this.body.length-1];
            //把最后的尾巴复制，重新加入到蛇的body中，body[]中每一行都是对象，所以要以对象的方式加
            this.body.push({
                x:lastBody.x,
                y:lastBody.y,
                color:lastBody.color
            });
            //把食物删除，重新初始化食物
            food.init(map);
        }
        //食物的横纵坐标
        // var foodX=food.x;
        // var foodY=food.y;
        //console.log(headX+"===>"+foodX);//吃到的时候，headX和foodX这两个值相等。
        // if(foodX==headX){
        //     console.log("吃到了");
        // }

    };//不加分号也可以

    //删除蛇的私有函数，避免走一步增加一段身子
    function remove(){
        //获取数组
        var i=elements.length-1;
        for(;i>=0;i--){//先删尾巴
            //先从当前的子元素找到其父级元素，然后删除这个子元素
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);//出bug
        }
    }

    //把Snake暴露给window,这样外部也可以访问
    window.Snake=Snake;
}());