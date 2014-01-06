(function(root){

  Game = root.Game = ( root.Game || {} );

  var Cell = Game.Cell = function(){
    this.alive = false;
    this.aliveNext = false;
  }

  Cell.prototype.toggleLife = function(){
    this.alive = !this.alive;
  }

  Cell.prototype.advance = function(){
    this.alive = this.aliveNext;
    this.aliveNext = false;
  }

})(this);