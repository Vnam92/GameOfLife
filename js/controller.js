//controller

var game = new Game("game");
var grid = new Grid(0, 0, Math.floor(600/20), Math.floor(800/20), 30, 30);

game.canvas.addEventListener('click', function(evt){
   var gridx = Math.floor(evt.offsetX / grid.width);
   var gridy = Math.floor(evt.offsetY / grid.height);
   grid.getCell(gridx, gridy).isAlive = true;
});

// window.addEventListener('keydown', function(){
//    grid.simulationOn = !grid.simulationOn;
// });
elem.addEventListener('click', function(){
   grid.simulationOn = !grid.simulationOn;
});
game.actors.push(grid);
game.start();