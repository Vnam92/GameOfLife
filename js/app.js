//entry
import View from "./view.js";
import Model from "./model.js";
import Controller from "./controller.js";

var view = new View("game");
var model = new Model(0, 0, Math.floor(600 / 20), Math.floor(540 / 20), 30, 30);
Controller(view, model);