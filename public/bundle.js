/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Controller;
//controller
function Controller(view, model) {
    var _view = view;
    var _model = model;

    _view.canvas.addEventListener('click', function (event) {
        var _gridx = Math.floor(event.offsetX / _model.width);
        var _gridy = Math.floor(event.offsetY / _model.height);
        _model.viewLiveCell(_gridx, _gridy);
    });

    start_btn.addEventListener('click', function () {
        _model.startSimulation();
    });

    stop_btn.addEventListener('click', function () {
        _model.stopSimulation();
    });

    accept.addEventListener('click', function () {
        _view.setWidth();
        _view.setHeight();
        _view.start();
    });

    _view.actors.push(_model);
    _view.start();

    return this;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Model;

var _cell = __webpack_require__(3);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Model(x, y, rows, columns, width, height) {

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

    var initialize = function initialize() {
        for (var i = 0; i < rows * columns; i++) {
            (function () {
                var x = i % columns;
                var y = Math.floor(i / columns);
                that.cells.push(new _cell2.default(x, y, that));
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
} //model
;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = View;
//view
function View(canvasId) {

    var that = this;
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');
    that.canvas = canvas;
    that.background = 'black';
    that.running = false;
    that.isDebug = true;
    that.actors = [];

    that.clear = function () {
        ctx.fillStyle = that.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    that.update = function (delta) {
        that.actors.forEach(function (a) {
            a.update(that, delta);
        });
    };

    that.draw = function (delta) {
        that.actors.forEach(function (a) {
            a.draw(ctx, delta);
        });
    };

    that.start = function () {
        that.running = true;

        var lastTime = Date.now();

        (function mainloop() {
            if (!that.running) return;
            window.requestAnimationFrame(mainloop);
            var current = Date.now();
            var elapsed = current - lastTime;
            that.clear();
            that.update(elapsed);
            that.draw(elapsed);
            lastTime = current;
        })();
    };

    that.setHeight = function () {
        return canvas.height = document.getElementById("number_btn_height").value;
    };

    that.setWidth = function () {
        return canvas.width = document.getElementById("number_btn_width").value;
    };

    return that;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Cell;
//cell
function Cell(x, y, grid) {

    var that = this;
    that.x = x;
    that.y = y;
    that.grid = grid;
    that.isAlive = false;

    that.getNeighbors = function () {
        return [that.grid.getCell(x - 1, y - 1), that.grid.getCell(x - 1, y), that.grid.getCell(x - 1, y + 1), that.grid.getCell(x, y - 1), that.grid.getCell(x, y + 1), that.grid.getCell(x + 1, y - 1), that.grid.getCell(x + 1, y), that.grid.getCell(x + 1, y + 1)];
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _view = __webpack_require__(2);

var _view2 = _interopRequireDefault(_view);

var _model = __webpack_require__(1);

var _model2 = _interopRequireDefault(_model);

var _controller = __webpack_require__(0);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var view = new _view2.default("game"); //entry

var model = new _model2.default(0, 0, Math.floor(1280 / 20), Math.floor(1024 / 20), 30, 30);
(0, _controller2.default)(view, model);

/***/ })
/******/ ]);