import Model from '../js/model.js';
import View from '../js/view.js';
import Cell from '../js/cell.js';

describe("A Cell ", () => {
    let cell;
    beforeEach(() => {
        cell = new Cell();
        cell.neighbors = [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()];
    });

    it("is defined", () => {
        expect(Cell).toBeDefined();
    });

    it("has 8 neighbors", () => {
        let neighbors = cell.getNeighbors;
        expect(neighbors).toBeDefined();
        expect(neighbors).toBeTruthy();

    });

    it("is dead by default", () => {
        expect(cell.isAlive).toBeDefined();
        expect(cell.isAlive).toBe(false);
    });

    it("will die if it has fewer than 2 live neighbors", () => {
        cell.neighbors[0].isAlive = true;
        spyOn(cell, 'willDie');
        cell.willDie();
        expect(cell.willDie).toHaveBeenCalled();

    });

    it("will be born if it has exactly 3 neighbors", () => {
        cell.neighbors[0].isAlive = true;
        cell.neighbors[1].isAlive = true;
        spyOn(cell, 'willBeBorn');
        cell.willBeBorn();
        expect(cell.willBeBorn).toHaveBeenCalled();
    });

    it("should die if it has more than 3 live neighbors", () => {
        cell.neighbors[0].isAlive = true;
        cell.neighbors[1].isAlive = true;
        cell.neighbors[2].isAlive = true;
        cell.neighbors[3].isAlive = true;
        spyOn(cell, 'willDie');
        cell.willDie();
        expect(cell.willDie).toHaveBeenCalled();
    });

});

describe("A Model", () => {
    let model;

    beforeEach(function () {
        model = new Model(0, 0, 30, 30, 30, 30);
    });

    it("is defined", () => {
        expect(model.currentTithat).toBeDefined();
        expect(model.speed).toBeDefined();
        expect(model.simulationOn).not.toBeTruthy();
        expect(model.background).toBeDefined();
        expect(model.foreground).toBeDefined();
        expect(model.cellColor).toBeDefined();
        expect(model.getCell).toBeDefined();
        expect(model.update).toBeDefined();
    });

    it("method update is called", () => {
        spyOn(model, 'update');
        model.update(1, 2);
        expect(model.update).toHaveBeenCalled();
    });

    it("method draw is called", () => {
        spyOn(model, 'draw');
        model.draw(1, 2);
        expect(model.draw).toHaveBeenCalled();
    });

    it("method getCell is called", () => {
        spyOn(model, 'getCell');
        model.getCell(1, 2);
        expect(model.getCell).toHaveBeenCalled();
    });

});


