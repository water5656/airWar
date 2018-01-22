function Sky(){
   this.y = 0;
   this.img = game.res["sky"];
}
Sky.prototype.render = function(){
   game.ctx.drawImage(this.img, 0, this.y, 400, 1180);
   game.ctx.drawImage(this.img, 0, this.y - 1180, 400, 1180);
   game.ctx.drawImage(this.img, 0, this.y - 2360, 400, 1180);
}
Sky.prototype.update = function(){
   this.y += 1;
   if(this.y > 1180){
      this.y = 0;
   }
}