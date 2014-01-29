(function(root){

  Game = root.Game = ( root.Game || {} )

  View = Game.View = function(){
    this.board = new Game.Board();
    this.$el = $('#board');
    this.running = false;
    this.setStartStop();
    this.setGrid();
  };

  View.prototype.setGrid = function(){
    this.$el.html('');
    for(var i = 0; i < this.board.cells.length; i++){
      for(var j = 0; j < this.board.cells[i].length; j++){
        var $cell = $('<div class="cell"></div>');
        $cell.attr('data-row', i);
        $cell.attr('data-col', j);
        $cell.attr('id', i + '-' + j)
        this.$el.append($cell);
      }
    }
    this.setCellClickHandle();
  };

  View.prototype.render = function(){
    for(var i = 0; i < this.board.cells.length; i++){
      for(var j = 0; j < this.board.cells[i].length; j++){
        var $cell = $('#' + i + '-' + j);
        $cell.removeClass("alive");
        if(this.board.cells[i][j].alive) $cell.addClass("alive");
        this.$el.append($cell);
      }
    }
    this.setCellClickHandle();
  };

  View.prototype.setCellClickHandle = function(){
    var that = this;
    $('.cell').on('click', function(){
      $this = $(this);
      var row = $this.attr('data-row');
      var col = $this.attr('data-col');
      that.board.cells[row][col].toggleLife();
      $this.addClass('alive');
    });
  };

  View.prototype.setStartStop = function(){
    var that = this;
    $('#start').on('click', function(){
      if(that.running){
        that.stop();
      } else{
        that.start();
      }
    });
    $('#step').on('click', function(){
      that.board.tick();
      that.render();
    });
    $('#reset').on('click', function(){
      that.stop();
      that.board = new Game.Board();
      that.setGrid();
    })
  }

  View.prototype.start = function(){
    this.running = true;
    var that = this;
    $('#start').text('Stop');
    this.timer = setInterval( function() {
      that.board.tick();
      that.render();
    }, 500);
  }

  View.prototype.stop = function(){
    this.running = false;
    $('#start').text('Start')
    clearInterval(this.timer);
  }

})(this);


$(function(){
  var v = new Game.View();
});

