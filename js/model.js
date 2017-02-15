//model

export default function Model(canvasId) {

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
    }

    that.update = function (delta) {
        that.actors.forEach(function (a) {
            a.update(that, delta);
        });
    }

    that.draw = function (delta) {
        that.actors.forEach(function (a) {
            a.draw(ctx, delta);
        });
    }

    that.start = function () {
        that.running = true;

        var lastTime = Date.now();

        (function mainloop() {
            if (!that.running) return;
            window.requestAnimationFrame(mainloop);
            // current time in millisec
            var current = Date.now();
            // time elapsed in milliseconds since the last frame
            var elapsed = current - lastTime;
            // update draw
            that.clear();
            that.update(elapsed);
            that.draw(elapsed);
            lastTime = current;
        })();
    }
    return that;
};


