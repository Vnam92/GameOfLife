//model
import Cell from "./cell.js";

export default function Model(x, y, rows, columns, width, height) {

    var that = this;
    that.x = x;
    that.y = y;
    that.rows = rows;
    that.columns = columns;
    that.width = width;
    that.height = height;
    that.currentTithat = 0;
    that.speed = 100;
    that.simulationOn = false;
    that.background = 'white';
    that.foreground = 'grey';
    that.cellColor = 'black';
    that.cells = [];

    var initialize = function () {
        for (var i = 0; i < (rows * columns); i++) {
            (function () {
                var x = i % columns;
                var y = Math.floor(i / columns);
                that.cells.push(new Cell(x, y, that));
            })();
        }
    };

    that.getCell = function (x, y) {
        x = (columns + x) % columns;
        y = (rows + y) % rows;

        return that.cells[x + y * columns];
    };

    that.update = function (engine, delta) {
        if (!that.simulationOn) return;

        // нахождение "умирающих" клеток
        that.currentTime += delta;
        if (that.currentTime < that.speed) return;
        var cellsToDie = that.cells.filter(function (c) {
            return c.willDie();
        });

        // нахождение "рождаюищхся" клеток
        var cellsToBeBorn = that.cells.filter(function (c) {
            return c.willBeBorn();
        });

        cellsToDie.forEach(function (c) {
            c.isAlive = false;
        });

        cellsToBeBorn.forEach(function (c) {
            c.isAlive = true;
        });

        that.currentTime = 0;
    };

    that.draw = function (ctx, delta) {
        ctx.save();
        ctx.translate(x, y);

        // отрисовка формы игрового окна
        ctx.fillStyle = that.background;
        ctx.fillRect(0, 0, columns * width, rows * height);
        ctx.fillStyle = that.foreground;
        var currX = 0;
        for (var i = 0; i < columns; i++) {
            ctx.beginPath();
            ctx.moveTo(currX, 0);
            ctx.lineTo(currX, rows * height);
            ctx.closePath();
            ctx.stroke();
            currX += width;
        }

        var currY = 0;
        for (var j = 0; j < rows; j++) {
            ctx.beginPath();
            ctx.moveTo(0, currY);
            ctx.lineTo(columns * width, currY);
            ctx.closePath();
            ctx.stroke();
            currY += height;
        }

        // отрисовка ячеек
        ctx.fillStyle = that.cellColor;
        var livingCells = that.cells.filter(function (c) {
            return c.isAlive;
        }).forEach(function (c) {
            ctx.fillRect(c.x * width, c.y * height, width, height);
        });

        ctx.restore();
    };

    that.viewLiveCell = function (gridx, gridy) {
        return that.getCell(gridx, gridy).isAlive = true;
    };

    that.startSimulation = function () {
        return that.simulationOn = true;
    };

    that.stopSimulation = function () {
        return that.simulationOn = false;
    };

    initialize();
    return that;
};

