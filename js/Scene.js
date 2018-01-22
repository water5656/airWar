function Scene(){
   //当前场景编号
   this.sNumber = 1;
   this.scores = 0;
   //初始化1号场景
   this.init(1);
   this.bindEvent();
}
Scene.prototype.init = function(number){
   switch(number) {
      case 1:
         //一号场景 游戏封面 和开始
         this.sky = new Sky();
         //初始化title button位置
         this.titleY = -42;
         this.buttonY = game.canvas.height + 72;
         break;
      case 2:
         this.sky = new Sky();
         this.tank = new Tank();
         break;
      case 3:
         this.second = 0;
         this.sky = new Sky();
         this.tank = new Tank();
         this.boss = new Boss();
      case 4:
         this.sky = new Sky();
         this.buttonX = -112;
         this.fenshuX = game.canvas.width;
         this.textY = -30;
         break;
   }
}
Scene.prototype.render = function(){
   switch(this.sNumber){
      case 1:
         this.sky.render();
         this.sky.update();
         game.ctx.drawImage(game.res["title"], (game.canvas.width - 215) / 2, this.titleY, 215, 42);
         this.titleY += 2;
         if(this.titleY > 200){
            this.titleY = 200;
         }
         this.buttonY -= 3;
         if(this.buttonY < 300){
            this.buttonY = 300;
         }
         game.ctx.drawImage(game.res["button"], (game.canvas.width - 72) / 2, this.buttonY);
         break;
      case 2:
         this.sky.render();
         this.sky.update();
         this.tank.render();
         //炮弹
         game.f % 20 == 0 && new Bullet();
         for(var i = 0; i < game.bArr.length; i++){
            game.bArr[i].render();
            game.bArr[i].update();
         }
         //敌机
         game.f % (51 - 2 * game.index) == 0 && (this.enemy = new Enemy());
         for(var j = 0; j < game.eArr.length; j++){
            game.eArr[j].render();
            game.eArr[j].update();
         }
         //敌机炮弹
         game.f % 60 == 0 && new EBullet();
         for(var k = 0; k < game.ebArr.length; k++){
            game.ebArr[k].render();
            game.ebArr[k].update();
         };
         //牛逼
         game.f % 333 == 0 && new Niubi();
            for(var k = 0; k < game.nArr.length; k++){
            game.nArr[k].render();
            game.nArr[k].update();
         }
         game.niu();
         game.score();
         game.renderboom();
         if(game.scores % 10 == 0){
            this.sNumber = 3;
            this.init(3);
         }
         break;
      case 3:
         this.sky.render();
         this.tank.render();
         this.boss.render();
         this.second ++;
         game.f % 20 == 0 && new Bullet();
         for(var i = 0; i < game.bArr.length; i++){
            game.bArr[i].render();
            game.bArr[i].update();
         }
         this.boss.update();
         if(this.second > 150 && this.boss.count > 0){
            document.getElementById("game").pause();
            document.getElementById("over").play();
            game.ctx.drawImage(game.res["boom"], game.scene.tank.x, game.scene.tank.y);
            this.boss.direction = [];
            if(game.f % 20 == 0){
               this.boss.k ++;
               if(this.boss.k > 2){
                  this.boss.k = 0;
                  this.sNumber = 4;
                  this.init(4);
                  this.second = 0;
               }
            }
            game.ctx.drawImage(this.boss.img2[this.boss.k], this.boss.x, this.boss.y);
            game.ctx.save();
            game.ctx.font = "40px 微软雅黑";
            game.ctx.textAlign = "center";
            game.ctx.fillText("game over", 200, 300);
            game.ctx.restore();
         }
         break;
      case 4:
         this.sky.render();
         game.ctx.drawImage(game.res["again"], this.buttonX, 386);
         this.buttonX += 6;
         if(this.buttonX > 144){
            this.buttonX = 144;
         }
         this.fenshuX -= 6;
         if(this.fenshuX <= 138){
            this.fenshuX = 138;
         }
         game.ctx.drawImage(game.res["fenshu"], this.fenshuX, 170, 123, 60);
         this.textY += 6;
         if(this.textY > 280){
            this.textY = 280;
         }
         game.ctx.save();
         game.ctx.font = "40px 微软雅黑";
         game.ctx.textAlign = "center";
         game.ctx.fillText(game.scores, 200, this.textY);
         game.ctx.restore();
         break;
   }
}
Scene.prototype.bindEvent = function(){
   var self = this;
   game.canvas.onmousedown = function(event){
      switch(self.sNumber){
         case 1:
            var x1 = (game.canvas.width - 72) / 2;
            var x2 = (game.canvas.width - 72) / 2 + 72;
            if(event.offsetX >= x1 && event.offsetX <= x2 && event.offsetY >= self.buttonY && event.offsetY <= self.buttonY + 72){
               self.sNumber = 2;
               self.init(2);
            }
            break;
         case 4:
            if(event.offsetX >= self.buttonX && event.offsetX <= self.buttonX + 112 && event.offsetY >= 386 && event.offsetY <= 414){
               game.scores = 1;
               game.index = 1;
               game.bArr = [];
               game.eArr = [];
               game.ebArr = [];
               game.nArr = [];
               game.mArr = [];
               document.getElementById("game").play();
               self.sNumber = 1;
               self.init(1);
            }
      }
   }
}