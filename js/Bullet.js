function Bullet(){
   this.x = game.scene.tank.x + 12;
   this.y = game.scene.tank.y - 10;
   this.img = game.res["bullet"];
   game.bArr.push(this);
}
Bullet.prototype.render = function(){
   game.ctx.drawImage(this.img, this.x, this.y);
}
Bullet.prototype.update = function(){
   this.y -= 10;
   if(this.y < -10){
      game.bArr = _.without(game.bArr, this);
   }

   this.x1 = this.x;
   this.x2 = this.x + 13;
   this.y1 = this.y;
   this.y2 = this.y + 13;
}