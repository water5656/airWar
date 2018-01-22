function Enemy(){
   this.x = _.random(1, game.canvas.width - 37);
   this.y = -20;
   this.img = game.res["enemy"];
   game.eArr.push(this);
}
Enemy.prototype.render = function(){
   game.ctx.drawImage(this.img, this.x, this.y);
}
Enemy.prototype.update = function(){
   this.y += game.index + 2;

   if(this.y > game.canvas.height + 50){
      game.eArr = _.without(game.eArr, this);
   }
   this.x1 = this.x;
   this.x2 = this.x + 35;
   this.y1 = this.y;
   this.y2 = this.y + 47;
   game.over();
}