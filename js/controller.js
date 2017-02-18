//controller
export default function Controller(view, model) {

    view.canvas.addEventListener('click', function (event) {
        var gridx = Math.floor(event.offsetX / model.width);
        var gridy = Math.floor(event.offsetY / model.height);
        model.viewLiveCell(gridx, gridy);
    });

    start_btn.addEventListener('click', function () {
        model.startSimulation();
    });

    stop_btn.addEventListener('click', function () {
        model.stopSimulation();
    });

    accept.addEventListener('click', function () {
        view.setWidth();
        view.setHeight();
        view.start();
    });

    view.actors.push(model);
    view.start();

    return this;
};
