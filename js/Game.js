function Game(){
   this.f = 0;
   this.k = 0;
   this.scores = 1;
   this.index = 1;
   this.m = 0;
   this.n = 0;
   this.style = 1;
   //炮弹数组bArr，敌机数组eArr，敌机炮弹ebArr, 爆炸数组mArr
   this.bArr = [];
   this.eArr = [];
   this.ebArr = [];
   this.nArr = [];
   this.mArr = [];
   this.init();
   this.bindEvent();
}
Game.prototype.init = function(){
   this.canvas = document.getElementById("canvas");
   this.ctx = canvas.getContext("2d");
   this.res = {
      "tank" : "images/tank.png",
      "tankL" : "images/tankL.png",
      "tankR" : "images/tankR.png",
      "enemy" : "images/enemy.png",
      "boss" : "images/boss.png",
      "boss1" : "images/boss1.png",
      "boss2" : "images/boss2.png",
      "boss3" : "images/boss3.png",
      "boss4" : "images/boss4.png",
      "bullet" : "images/bullet.png",
      "eb" : "images/eb.png",
      "boom" : "images/boom.png",
      "boom1" : "images/boom1.png",
      "boom2" : "images/boom2.png",
      "niubi" : "images/pao.png",
      "sky" : "images/sky.jpg",
      "title" : "images/title.png",
      "button" : "images/button.png",
      "again" : "images/again.png",
      "fenshu" : "images/score.png"
   }
   this.length = Object.keys(this.res).length;
   var count = 0;
   var self = this;
   for(var k in this.res){
      var img = new Image();
      img.src = this.res[k];
      this.res[k] = img;
      img.onload = function(){
         count ++;
         self.clear();
         self.ctx.font = "16px 微软雅黑";
         self.ctx.textAlign = "center";
         self.ctx.fillText(`加载中：${count} / ${self.length}`, self.canvas.width / 2, self.canvas.height / 2);
         if(count == self.length){
            self.start();
         }
      }
   }
}
Game.prototype.clear = function(){
   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
Game.prototype.bindEvent = function(){
   var self = this;
   document.onkeydown = function(e){
      switch(e.keyCode){
         case 37:
            self.scene.tank.left();
            break;
         case 38:
            self.scene.tank.up();
            break;
         case 39:
            self.scene.tank.right();
            break;
         case 40:
            self.scene.tank.down();
            break;
      }
   }
   document.onkeyup = function(){
      self.scene.tank.img = self.res["tank"];
   }
}
Game.prototype.over = function(){
   //敌机炮弹打死
   this.ebArr.forEach((item)=>{
      if(item.x > this.scene.tank.x && item.x < this.scene.tank.x + 37){
         if(item.y > this.scene.tank.y + 1 && item.y < this.scene.tank.y + 47){
            this.ctx.drawImage(this.res["boom"], this.scene.tank.x, this.scene.tank.y,37, 47);
            document.getElementById("game").pause();
            document.getElementById("over").play();
            game.scene.sNumber = 4;
            game.scene.init(4);
         }
      }
   });
   //敌机打死
   this.eArr.forEach((item)=>{
      if(item.x + 35 > this.scene.tank.x && item.x < this.scene.tank.x + 35){
         if(item.y + 45 > this.scene.tank.y + 1 && item.y < this.scene.tank.y + 45){
            this.ctx.drawImage(this.res["boom"], this.scene.tank.x, this.scene.tank.y,37, 47);
            document.getElementById("game").pause();
            document.getElementById("over").play();
            game.scene.sNumber = 4;
            game.scene.init(4);
         }
      }
   });
};
Game.prototype.score = function(){
   //敌机死
   for (var i = 0; i < this.bArr.length; i++) {
      for (var j = 0; j < this.eArr.length; j++) {
         if(this.bArr[i].x2 > this.eArr[j].x1 && this.bArr[i].x1 < this.eArr[j].x2){
            if(this.bArr[i].y1 < this.eArr[j].y2 && this.bArr[i].y2 > this.eArr[j].y1){
               document.getElementById("enemyDie").play();
               this.style = 1;
               this.m = this.eArr[j].x;
               this.n = this.eArr[j].y;
               this.mArr.push(this.m);
               this.mArr.push(this.n);
               this.bArr = _.without(this.bArr, this.bArr[i]);
               this.eArr = _.without(this.eArr, this.eArr[j]);
               this.scores ++;
            }
         }
      };
   };
    if(this.scores > 5){
      this.index = 3;
   }
   if(this.scores > 10){
      this.index = 5;
   }
};
//让爆炸显示的时间长一点
Game.prototype.renderboom = function(){
   if(this.style == 1){
      this.f % 2 == 0 && this.k++;
      this.ctx.drawImage(this.res["boom1"], this.k*36, 0, 36, 48, this.mArr[0], this.mArr[1],36, 48);
      if(this.k > 9){
         this.k = 0;
         this.mArr = [];
      }
   }else if(this.style == 2){
      this.f % 2 == 0 && this.k++;
      this.ctx.drawImage(game.res["boom2"], this.k*67, 0, 67, 77, 133, 223,134, 154);
      if(this.k > 9){
         this.k = 0;
         this.style = 1;
      }
   }
}
Game.prototype.niu = function(){
   for(var i = 0; i < this.nArr.length; i++){
      if(this.nArr[i].x2 > this.scene.tank.x && this.nArr[i].x1 < this.scene.tank.x + 36){
         if(this.nArr[i].y2 > this.scene.tank.y && this.nArr[i].y1 < this.scene.tank.y + 47){
            this.style = 2;
            this.scores += this.eArr.length;
            this.nArr.splice(i, 1);
            this.bArr = [];
            this.eArr = [];
         }
      }
   }
}
Game.prototype.start = function() {
   this.scene = new Scene();
   var self = this;
   this.timer = setInterval(function(){
      self.f ++;
      self.clear();
      self.scene.render();
      self.ctx.fillStyle = "#000";
      self.ctx.fillText(self.f, 20, 20);
      self.ctx.fillText(self.scores, 20, 40);
   },20)
};