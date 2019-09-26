"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var _restaurants = _interopRequireDefault(require("./routes/restaurants.routes"));

var _users = _interopRequireDefault(require("./routes/users.routes"));

var _reviews = _interopRequireDefault(require("./routes/reviews.routes"));

var _images = _interopRequireDefault(require("./routes/images.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var path = require('path');

var app = (0, _express["default"])(); // Static files

app.use(_express["default"]["static"](path.join(__dirname, '/uploads/'))); // Config

app.set('port', process.env.PORT || 3000); // Rutas

// Middlewares
app.use(_express["default"].json());
app.use(_index["default"]);
app.use('/restaurants', _restaurants["default"]);
app.use('/users', _users["default"]);
app.use('/reviews', _reviews["default"]);
app.use('/images', _images["default"]);
var _default = app;
exports["default"] = _default;