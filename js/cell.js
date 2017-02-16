//cell
export default function Cell(x, y, grid) {

    var that = this;
    that.x = x;
    that.y = y;
    that.grid = grid;
    that.isAlive = false;

    that.getNeighbors = function () {
        return [that.grid.getCell(x - 1, y - 1),
            that.grid.getCell(x - 1, y),
            that.grid.getCell(x - 1, y + 1),
            that.grid.getCell(x, y - 1),
            that.grid.getCell(x, y + 1),
            that.grid.getCell(x + 1, y - 1),
            that.grid.getCell(x + 1, y),
            that.grid.getCell(x + 1, y + 1)];
    };

    that.willDie = function () {
        var livingNeighbors = that.getNeighbors().filter(function (c) {
            return c.isAlive;
        });

        if (livingNeighbors.length < 2) {
            return true;
        }

        if (livingNeighbors.length > 3) {
            return true;
        }

        return false;
    };

    that.willBeBorn = function () {
        var livingNeighbors = that.getNeighbors().filter(function (c) {
            return c.isAlive;
        });

        if (livingNeighbors.length === 3) {
            return true;
        }
        return false;
    };

    return that;
};

