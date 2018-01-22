function EBullet(){
   this.x = game.scene.enemy.x + 18;
   this.y = game.scene.enemy.y + 50;
   this.img = game.res["eb"];
   game.ebArr.push(this);
}
EBullet.prototype.render = function(){
   game.ctx.drawImage(this.img, this.x, this.y);
}
EBullet.prototype.update = function(){
   this.y += (game.index*3.5);
   if(this.y > game.canvas.height + 50){
      game.ebArr = _.without(game.ebArr, this);
   }
   game.over();
}