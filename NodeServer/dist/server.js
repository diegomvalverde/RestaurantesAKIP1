"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = validateToken;
exports.jwt = exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var _restaurants = _interopRequireDefault(require("./routes/restaurants.routes"));

var _users = _interopRequireDefault(require("./routes/users.routes"));

var _reviews = _interopRequireDefault(require("./routes/reviews.routes"));

var _images = _interopRequireDefault(require("./routes/images.routes"));

var _login = _interopRequireDefault(require("./routes/login.routes"));

var _comments = _interopRequireDefault(require("./routes/comments.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var path = require('path');

var app = (0, _express["default"])();

var jwt = require('jsonwebtoken');

exports.jwt = jwt;

function validateToken(req, res, next) {
  var bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    var bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
} // Static files


app.use(_express["default"]["static"](path.join(__dirname, '../src/uploads/'))); // Config

app.set('port', process.env.PORT || 3000); // Rutas

// Middlewares
app.use(_express["default"].json());
app.use(_index["default"]);
app.use('/restaurants', _restaurants["default"]);
app.use('/users', _users["default"]);
app.use('/reviews', _reviews["default"]);
app.use('/images', _images["default"]);
app.use('/login', _login["default"]);
app.use('/comments', _comments["default"]);
var _default = app;
exports["default"] = _default;