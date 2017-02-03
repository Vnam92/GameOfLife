//controller
'use strict';

var Controller = function (view, model) {
    var _view = view;
    var _model = model;

    // event binding
    _model.canvas.addEventListener('click', function (event) {
        var gridx = Math.floor(event.offsetX / _view.width);
        var gridy = Math.floor(event.offsetY / _view.height);
        _view.getCell(gridx, gridy).isAlive = true;
    });

    elem.addEventListener('click', function () {
        _view.simulationOn = !_view.simulationOn;
    });

};

//main
(function () {
    var init = {
        main: function () {
            var model = new Model("game");
            var view = new View(0, 0, Math.floor(600 / 20), Math.floor(800 / 20), 30, 30);
            var controller = Controller(view, model);
            model.actors.push(view);
            model.start();
        }
    };
    init.main();
}());