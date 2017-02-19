//controller
export default function Controller(view, model) {
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
