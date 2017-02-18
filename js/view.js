//view
export default function View(canvasId) {

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


