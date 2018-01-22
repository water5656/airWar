function Boss(){
   this.img = game.res["boss"];
   this.img1 = game.res["boss1"];
   this.img2 = [game.res["boss2"], game.res["boss3"], game.res["boss4"]];
   this.x = _.random(0, 235);
   this.y = _.random(0, 100);
   this.count = 5;
   this.k = 0;
}
Boss.prototype.render = function(){
   game.ctx.drawImage(this.img, this.x, this.y);
}
Boss.prototype.update = function(){
   var self = this;

   switch(this.direction){
      case "down":
         self.y +=3;
         if(self.y > game.canvas.height - 250){
            self.y = game.canvas.height - 250;
         }
         break;
      case "up":
         self.y -= 3;
         if(self.y < 0){
            self.y = 0;
         }
         break;
      case "left":
         self.x -= 3;
         if(self.x < 0){
            self.x = 0;
         }
         break;
      case "right":
         self.x += 3;
         if(self.x > game.canvas.width - 165){
            self.x = game.canvas.width - 165;
         }
         break;
   }
   this.x1 = this.x;
   this.x2 = this.x + 165;
   this.y1 = this.y;
   this.y2 = this.y + 250;
   for (var i = 0; i < game.bArr.length; i++) {
      if(game.bArr[i].x2 > this.x1 && game.bArr[i].x1 < this.x2){
         if(game.bArr[i].y2 > this.y1 && game.bArr[i].y1 < this.y2){
            game.ctx.drawImage(this.img1, this.x, this.y);
            this.count --;
            game.bArr = _.without(game.bArr, game.bArr[i]);
         }else{
         game.ctx.drawImage(this.img, this.x, this.y);
         }
      }
   };
   if(game.scene.tank.x+37 > this.x1 && game.scene.tank.x < this.x2){
      if(game.scene.tank.y+47 > this.y1 && game.scene.tank.y < this.y2){
         game.ctx.drawImage(game.res["boom"], game.scene.tank.x, game.scene.tank.y, 37, 47);
         game.scene.sNumber = 4;
         game.scene.init(4);
      }
   };
   if(this.count > 0){
      game.f % 8 == 0 && (this.direction = ["down", "up", "left", "right"][_.random(0,3)]);
   }else{
      document.getElementById("bossDie").play();
      this.over();
   }
}
Boss.prototype.over = function(){
   this.direction = [];
   game.f % 20 == 0 && this.k ++;
   if(this.k > 2){
      this.k = 0;
      game.scores += 5;
      game.bArr = [];
      game.eArr = [];
      game.ebArr = [];
      game.nArr = [];
      game.mArr = [];
      game.scene.sNumber = 2;
      game.scene.init(2);
   }
   game.ctx.drawImage(this.img2[this.k], this.x, this.y);
}
