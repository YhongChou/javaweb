//自调用函数，食物Food
(function (){
    var elements=[];//用来保存每个食物小方块div的数组

    //食物就是一个对象，有：宽、高、背景色、横纵坐标，需先定义构造函数
    function Food(x,y,width,height,color) {
        //横坐标
        this.x=x||0;
        this.y=y||0;
        //宽高
        this.width=width||20;
        this.height=height||20;
        //背景色
        this.color=color||"green";
    }

    //为原型添加初始化的方法（在页面上显示这个食物）
    //食物要在地图上显示，需要参数 地图//地图 map----等价于页面上的 .class=map的div// <div class="map">
    Food.prototype.init=function(map){
        //先删除这个食物，这样不管调用多少次，在地图上只显示一个
        //调用函数 remove()，删除以前产生的，这样不管产生多少个食物，都只有一个食物产生
        remove();

        //创建div
        var div=document.createElement("div");
        //把div加到map中
        map.appendChild(div);
        //设置div样式
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
        //脱离文档流
        div.style.position="absolute";
        //产生随机坐标
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";

        //把div加到数组elements中；
        elements.push(div);
    };

    //私有函数---删除食物的，remove()是一个函数，都在自调用函数里，所以函数外不可以调用
    function remove(){
        //elements数组中现在已经有这个元素
        for(var i=0;i<elements.length;i++){
            var ele=elements[i];
            //找到这个子元素的父级元素（map），然后删除这个元素,但elements中还存在
            ele.parentNode.removeChild(ele);
            //把子元素elements[]中的ele删除，清空此数组
            elements.splice(i,i);
        }
    }

    //把Food暴露给window,外部可使用
    window.Food=Food;//为了让Food函数在外面也可以被调用，将Food变为全局函数
}());