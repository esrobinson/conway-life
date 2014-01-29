(function(root) {

  Game = root.Game = ( root.Game || {} );

  var Board = Game.Board = function(){
    this.cells = [];
    this.setCells();
  };

  Board.SIZE = 50;

  Board.prototype.setCells = function(){
    for(var i = 0; i < Board.SIZE; i++){
      this.cells.push([]);
      for(var j = 0; j < Board.SIZE; j++){
        this.cells[i].push(new Game.Cell());
      }
    }
  };

  Board.prototype.tick = function(){
    for(var i = 0; i < this.cells.length; i++){
      for(var j = 0; j < this.cells[i].length; j++){
        this.setNextState(i, j);
      }
    }
    for(var i = 0; i < this.cells.length; i++){
      for(var j = 0; j < this.cells[i].length; j++){
        this.cells[i][j].advance();
      }
    }
  };

  Board.prototype.setNextState = function(row, col){
    var livingNeighbors = 0;
    for(var i = -1; i <= 1; i++){
      for(var j = -1; j <= 1; j++){
        if(j != 0 || i != 0){
          if(this.isAlive(row + i, col + j)) livingNeighbors++;
        } 
      }
    }
    if(livingNeighbors === 3){
      this.cells[row][col].aliveNext = true;
    } else if(livingNeighbors === 2) {
      this.cells[row][col].aliveNext = this.cells[row][col].alive;
    }
  };

  Board.prototype.isAlive = function(row, col){
    if(row < 0 || col < 0 || row >= Board.SIZE || col >= Board.SIZE){
      return false;
    }
    return this.cells[row][col].alive;
  };



})(this);