function Niubi(){
   this.x =  _.random(1, game.canvas.width - 37);
   this.y = -50;
   this.img = game.res["niubi"];
   game.nArr.push(this);
}
Niubi.prototype.render = function(){
   game.ctx.drawImage(this.img, this.x, this.y, 40, 40)
}
Niubi.prototype.update = function(){
   this.y += 2;
   this.x1 = this.x;
   this.x2 = this.x + 40;
   this.y1 = this.y;
   this.y2 = this.y + 40;
}