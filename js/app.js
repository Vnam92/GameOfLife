//entry
import Model from "./model.js";
import View from "./view.js";
import Controller from "./controller.js";

var view = new View(0, 0, Math.floor(600 / 20), Math.floor(800 / 20), 30, 30);
var model = new Model("game");
Controller(view, model);