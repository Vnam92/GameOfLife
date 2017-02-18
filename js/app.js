//entry
import View from "./view.js";
import Model from "./model.js";
import Controller from "./controller.js";

var view = new View("game");
<<<<<<< HEAD
var model = new Model(0, 0, Math.floor(1366 / 20), Math.floor(1024 / 20), 30, 30);
=======
var model = new Model(0, 0, Math.floor(600 / 20), Math.floor(540 / 20), 30, 30);
>>>>>>> origin/master
Controller(view, model);