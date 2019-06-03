//自调用函数，游戏Game
(function(){
    var that=null;
    function Game(map) {//Game为构造函数
        //游戏的构造函数
        this.food=new Food();//this为构造函数的实例对象
        this.snake=new Snake();
        this.map=map;
        that=this;//保存当前的实例对象this到that变量中，防止以后this对象的指向发生变化
    }
    //初始化游戏-----将蛇和食物显示出来
    Game.prototype.init=function () {//为原型的方法
        //初始化游戏

        //初始化食物
        this.food.init(this.map);//this为构造函数Game的实例对象
        //初始化蛇
        this.snake.init(this.map);
        //完成一次移动
        // this.snake.move(this.food,this.map);
        // this.snake.init(this.map);
        // setInterval(function () {
        //     //setInterval 用window调用，其中的this为window,不再是食物对象
        //     that.snake.move(that.food,that.map);
        //     that.snake.init(that.map);
        // },150);

        //调用自动移动蛇的方法=============蛇自动移动的方法
        this.runSnake(this.food,this.map);
        //调用按键的方法
        this.bindKey();
    };

    //添加原型方法--设置小蛇可以自己自动的跑起来
    Game.prototype.runSnake=function(food,map){//为原型的方法
        //自动的移动，不止可以向右。
        var timeId=setInterval(function () {
            //此时的this是window，不是gm
            //移动小蛇
            this.snake.move(food,map);
            //初始化小蛇
            this.snake.init(map);
            //横坐标的最大值
            var maxX=map.offsetWidth/this.snake.width;//offsetWidth是div中设置的宽度
            console.log(headX);
            //纵坐标的最大值
            var maxY=map.offsetHeight/this.snake.height;
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            //横坐标
            if(headX<0||headX>maxX){
                //撞墙了，停止定时器
                clearInterval(timeId);
                alert("都结束啦别吃了");
            }
            //纵坐标
            if(headY<0||headY>maxY){
                //撞墙了，停止定时器
                clearInterval(timeId);
                alert("都结束啦别吃了");
            }
            // console.log(headX);//40
            // console.log(headX+"==="+this.snake.body[0].x);
        }.bind(that),150);
    };

    //添加原型方法---设置用户按键，改变小蛇的方向
    Game.prototype.bindKey=function(){
        console.log("bindKey方法调用了吗？弹出即调用")
        //获取用户的按键，改变小蛇的方向
        document.addEventListener("keydown",function(e){
            //这里的this是触发keydown事件的对象---document,
            //所以，这里的this是document
            //获取按键的值
            switch (e.keyCode) {
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;

            }
        }.bind(that),false);
    };
    window.Game=Game;
}());