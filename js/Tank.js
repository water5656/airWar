function Tank(){
   this.x = game.canvas.width / 2 - 19;
   this.y = game.canvas.height - 100;
   this.img = game.res["tank"];
}
Tank.prototype.render = function(){
   game.ctx.drawImage(this.img, this.x, this.y);
}
Tank.prototype.left = function(){
   this.img = game.res["tankL"];
   this.x -= 5;
   if(this.x < 1){
      this.x = 1;
   }
}
Tank.prototype.right = function(){
   this.img = game.res["tankR"];
   this.x += 5;
   if(this.x > game.canvas.width - 38){
      this.x = game.canvas.width - 38;
   }
}
Tank.prototype.up = function(){
   this.y -= 5;
   if(this.y < 1){
      this.y = 1;
   }
}
Tank.prototype.down = function(){
   this.y += 5;
   if(this.y > game.canvas.height - 50){
      this.y = game.canvas.height - 50;
   }
}