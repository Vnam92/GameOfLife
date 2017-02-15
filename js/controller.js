//controller

export default function Controller(view, model) {
    model.actors.push(view);
    model.start();

    model.canvas.addEventListener('click', function (event) {
        var gridx = Math.floor(event.offsetX / view.width);
        var gridy = Math.floor(event.offsetY / view.height);
        view.getCell(gridx, gridy).isAlive = true;
    });

    elem.addEventListener('click', function () {
        view.simulationOn = !view.simulationOn;
    });
    return this;
};
