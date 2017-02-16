//controller
export default function Controller(view, model) {

    view.canvas.addEventListener('click', function (event) {
        var gridx = Math.floor(event.offsetX / model.width);
        var gridy = Math.floor(event.offsetY / model.height);
        model.viewLiveCell(gridx, gridy);
    });

    elem.addEventListener('click', function () {
        model.startSimulation();
    });

    view.actors.push(model);
    view.start();
    return this;
};
