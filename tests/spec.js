/// jasmine test runner


describe("The model", function(){
   var cell;
   beforeEach(function(){
      cell = new Cell();
      cell.neighbors = [new Cell(), new Cell(), new Cell(), new Cell(),new Cell(), new Cell(), new Cell(), new Cell()];
   });

   it("is defined", function(){
      expect(Cell).toBeDefined();
   });

   it("has 8 neighbors", function(){
      var neighbors = cell.getNeighbors;
      expect(neighbors).toBeDefined();
      expect(neighbors).toBeTruthy();
      // expect(neighbors.length).toBe(8);
   });

   it("is dead by default", function(){
      expect(cell.isAlive).toBeDefined();
      expect(cell.isAlive).toBe(false);
   });

   it("will die if it has fewer than 2 live neighbors", function(){      
      expect(cell.willDie).toBeDefined();
   });

   it("will be born if it has exactly 3 neighbors", function(){
      expect(cell.willBeBorn).toBeDefined();
   });


});

describe("The view", function(){
   var grid;

   beforeEach(function(){
      grid = new Grid();
   });

   it("is defined", function(){
      expect(grid.currentTithat).toBeDefined();
      expect(grid.speed).toBeDefined();
      expect(grid.simulationOn).not.toBeTruthy();
      expect(grid.background).toBeDefined();
      expect(grid.foreground).toBeDefined();
      expect(grid.cellColor).toBeDefined();
      expect(grid.getCell).toBeDefined();
      expect(grid.update).toBeDefined();
   });

   it("method update is called", function(){
      spyOn(grid, 'update');
      grid.update(1,2);
      expect(grid.update).toHaveBeenCalled();
   });

   it("method draw is called", function(){
      spyOn(grid, 'draw');
      grid.draw(1,2);
      expect(grid.draw).toHaveBeenCalled();
   });

   it("method draw is called", function(){
      spyOn(grid, 'draw');
      grid.draw(1,2);
      expect(grid.draw).toHaveBeenCalled();
   });   

   it("method getCell is called", function(){
      spyOn(grid, 'getCell');
      grid.getCell(1,2);
      expect(grid.getCell).toHaveBeenCalled();
   });

});

