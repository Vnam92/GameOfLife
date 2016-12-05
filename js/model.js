//model
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               window.msRequestAnimationFrame;

var Game = function(canvasId){
   var that = this;
   var canvas = document.getElementById(canvasId);
   var ctx = canvas.getContext('2d');

   that.canvas = canvas;
   that.background = 'black';
   that.running = false;
   that.isDebug = true;
   that.actors = [];

   that.clear = function(){
      ctx.fillStyle = that.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   that.update = function(delta){
      that.actors.forEach(function(a){
         a.update(that, delta);
      });
   }

   that.draw = function(delta){
      that.actors.forEach(function(a){
         a.draw(ctx, delta);
      });
   }

   that.start = function(){
      that.running = true;

      var lastTime = Date.now();

      (function mainloop(){
         if(!that.running) return;
         window.requestAnimationFrame(mainloop);
         // current time in milliseconds
         var current = Date.now();
         // time elapsed in milliseconds since the last frame
         var elapsed = current - lastTime;
         // update draw
         that.clear();
         that.update(elapsed);
         that.draw(elapsed);

         lastTime = current;
      })();
   }
   return that;
}

var Cell = function(x, y, grid){
   var that = this;
   that.x = x;
   that.y = y;
   that.grid = grid;
   that.isAlive = false;

   that.getNeighbors = function(){
      return [that.grid.getCell(x-1, y-1), 
                   that.grid.getCell(x-1, y), 
                   that.grid.getCell(x-1, y+1), 
                   that.grid.getCell(x, y-1), 
                   that.grid.getCell(x, y+1), 
                   that.grid.getCell(x+1, y-1), 
                   that.grid.getCell(x+1, y), 
                   that.grid.getCell(x+1, y+1)];
   }

   that.willDie = function(){
      var livingNeighbors = that.getNeighbors().filter(function(c){
         return c.isAlive;
      });

      if(livingNeighbors.length < 2){
         return true;
      }

      if(livingNeighbors.length > 3){
         return true;
      }

      return false;
   }

   that.willBeBorn = function(){
      var livingNeighbors = that.getNeighbors().filter(function(c){
         return c.isAlive;
      });

      if(livingNeighbors.length === 3){
         return true;
      }
      return false;
   }

   return that;
}
