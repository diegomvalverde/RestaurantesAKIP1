"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _server = require("../server");

var _database = require("../database");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();

var path = require('path');

//Database connection
var _require = require("mongodb"),
    ObjectID = _require.ObjectID;

var Distance = require("geo-distance"); // Consulta todos los restaurantes


router.get('/foodtypes', _server.validateToken,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _server.jwt.verify(req.token, 'my_secret_token',
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(err, data) {
                var food, db, result, i;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 4;
                          break;
                        }

                        res.sendStatus(403);
                        _context.next = 13;
                        break;

                      case 4:
                        // const {foodtypes} = req.params;
                        food = [];
                        _context.next = 7;
                        return (0, _database.connect)();

                      case 7:
                        db = _context.sent;
                        _context.next = 10;
                        return db.collection('foodtypes').find({}).toArray();

                      case 10:
                        result = _context.sent;

                        for (i = 0; i < result.length; i++) {
                          food.push(result[i].foodtype);
                        }

                        res.json(food);

                      case 13:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Consulta un restaurante por el id

router.get('/:restaurantId', _server.validateToken,
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var restaurantId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            restaurantId = req.params.restaurantId;

            _server.jwt.verify(req.token, 'my_secret_token',
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(err, data) {
                var db, restaurantsMongo, reviewsMongo, imagesMongo, images, reviews, comments, scoreTotal, lPrice, mPrice, hPrice, i;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!err) {
                          _context3.next = 4;
                          break;
                        }

                        res.sendStatus(403);
                        _context3.next = 33;
                        break;

                      case 4:
                        _context3.next = 6;
                        return (0, _database.connect)();

                      case 6:
                        db = _context3.sent;
                        _context3.next = 9;
                        return db.collection('restaurants').findOne({
                          _id: ObjectID(restaurantId)
                        });

                      case 9:
                        restaurantsMongo = _context3.sent;
                        _context3.next = 12;
                        return db.collection('reviews').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 12:
                        reviewsMongo = _context3.sent;
                        _context3.next = 15;
                        return db.collection('images').find({
                          idRestaurant: ObjectID(restaurantId)
                        }).toArray();

                      case 15:
                        imagesMongo = _context3.sent;
                        _context3.next = 18;
                        return db.collection('comments').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 18:
                        restaurantsMongo.comments = _context3.sent;
                        images = [];
                        reviews = [];
                        comments = [];
                        scoreTotal = 0;
                        lPrice = 0;
                        mPrice = 0;
                        hPrice = 0;

                        for (i = 0; i < imagesMongo.length; i++) {
                          images.push(path.join('https://restaurantsakip1.herokuapp.com/' + imagesMongo[i].imageDir));
                        } // for (var i = 0; i < commentsMongo.length; i++) {
                        //     comments.push(commentsMongo[i]);
                        //
                        // }


                        for (i = 0; i < reviewsMongo.length; i++) {
                          reviews.push(reviewsMongo[i]);
                          scoreTotal += reviewsMongo[i].score;

                          if (reviewsMongo[i].price == "Barato") {
                            lPrice++;
                          } else if (reviewsMongo[i].price == "Regular") {
                            mPrice++;
                          } else {
                            hPrice++;
                          }
                        } // float avgScore = scoreTotal/reviewsMongo.length;


                        restaurantsMongo.images = images;
                        restaurantsMongo.reviews = reviews;

                        if (scoreTotal > 0) {
                          restaurantsMongo.stars = scoreTotal / reviewsMongo.length;
                        } else {
                          restaurantsMongo.stars = 5;
                        } // restaurantsMongo.score = scoreTotal/reviewsMongo.length;


                        if (lPrice > mPrice && lPrice > hPrice) {
                          restaurantsMongo.price = "Barato";
                        } else if (hPrice > lPrice && hPrice > mPrice) {
                          restaurantsMongo.price = "Caro";
                        } else {
                          restaurantsMongo.price = "Regular";
                        } // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
                        // console.log(jsonResult);


                        res.json(restaurantsMongo);

                      case 33:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x7, _x8) {
                return _ref4.apply(this, arguments);
              };
            }()); // const {restaurantId} = req.params;


          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // Obtener restaurantes sin filtro

router.get('/', _server.validateToken,
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _server.jwt.verify(req.token, 'my_secret_token',
            /*#__PURE__*/
            function () {
              var _ref6 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5(err, data) {
                var db, restaurantsMongo, z, restaurantId, reviewsMongo, imagesMongo, images, reviews, scoreTotal, lPrice, mPrice, hPrice, i;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!err) {
                          _context5.next = 4;
                          break;
                        }

                        res.sendStatus(403);
                        _context5.next = 38;
                        break;

                      case 4:
                        _context5.next = 6;
                        return (0, _database.connect)();

                      case 6:
                        db = _context5.sent;
                        _context5.next = 9;
                        return db.collection('restaurants').find({}).toArray();

                      case 9:
                        restaurantsMongo = _context5.sent;
                        z = 0;

                      case 11:
                        if (!(z < restaurantsMongo.length)) {
                          _context5.next = 37;
                          break;
                        }

                        restaurantId = restaurantsMongo[z]._id;
                        _context5.next = 15;
                        return db.collection('reviews').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 15:
                        reviewsMongo = _context5.sent;
                        _context5.next = 18;
                        return db.collection('images').find({
                          idRestaurant: ObjectID(restaurantId)
                        }).toArray();

                      case 18:
                        imagesMongo = _context5.sent;
                        _context5.next = 21;
                        return db.collection('comments').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 21:
                        restaurantsMongo[z].comments = _context5.sent;
                        images = [];
                        reviews = [];
                        scoreTotal = 0;
                        lPrice = 0;
                        mPrice = 0;
                        hPrice = 0;

                        for (i = 0; i < imagesMongo.length; i++) {
                          images.push(path.join('https://restaurantsakip1.herokuapp.com/' + imagesMongo[i].imageDir));
                        }

                        for (i = 0; i < reviewsMongo.length; i++) {
                          reviews.push(reviewsMongo[i]);
                          scoreTotal += reviewsMongo[i].score;

                          if (reviewsMongo[i].price == "Barato") {
                            lPrice++;
                          } else if (reviewsMongo[i].price == "Regular") {
                            mPrice++;
                          } else {
                            hPrice++;
                          }
                        } // flo


                        restaurantsMongo[z].images = images;
                        restaurantsMongo[z].reviews = reviews;

                        if (scoreTotal > 0) {
                          restaurantsMongo[z].stars = scoreTotal / reviewsMongo.length;
                        } else {
                          restaurantsMongo[z].stars = 5;
                        }

                        if (lPrice > mPrice && lPrice > hPrice) {
                          restaurantsMongo[z].price = "Barato";
                        } else if (hPrice > lPrice && hPrice > mPrice) {
                          restaurantsMongo[z].price = "Caro";
                        } else {
                          restaurantsMongo[z].price = "Regular";
                        }

                      case 34:
                        z++;
                        _context5.next = 11;
                        break;

                      case 37:
                        res.json(restaurantsMongo);

                      case 38:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x11, _x12) {
                return _ref6.apply(this, arguments);
              };
            }()); // const {restaurantId} = req.params;


          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); // Consulta todos los restaurantes con filtro

router.post('/filter/', _server.validateToken,
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _server.jwt.verify(req.token, 'my_secret_token',
            /*#__PURE__*/
            function () {
              var _ref8 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee7(err, data) {
                var name, stars, price, foodType, distance, db, restaurantsMongo, z, restaurantId, reviewsMongo, imagesMongo, images, reviews, scoreTotal, lPrice, mPrice, hPrice, i, nombres, starsArray, foodTypes, distanceArray, from, to, pricesArray;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        if (!err) {
                          _context7.next = 4;
                          break;
                        }

                        res.sendStatus(403);
                        _context7.next = 53;
                        break;

                      case 4:
                        // Constantes para hacer los filtros
                        name = req.body.name;
                        stars = req.body.stars;
                        price = req.body.price;
                        foodType = req.body.foodType;
                        distance = req.body.distance;
                        _context7.next = 11;
                        return (0, _database.connect)();

                      case 11:
                        db = _context7.sent;
                        _context7.next = 14;
                        return db.collection('restaurants').find({}).toArray();

                      case 14:
                        restaurantsMongo = _context7.sent;
                        z = 0;

                      case 16:
                        if (!(z < restaurantsMongo.length)) {
                          _context7.next = 42;
                          break;
                        }

                        restaurantId = restaurantsMongo[z]._id;
                        _context7.next = 20;
                        return db.collection('reviews').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 20:
                        reviewsMongo = _context7.sent;
                        _context7.next = 23;
                        return db.collection('images').find({
                          idRestaurant: ObjectID(restaurantId)
                        }).toArray();

                      case 23:
                        imagesMongo = _context7.sent;
                        _context7.next = 26;
                        return db.collection('comments').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 26:
                        restaurantsMongo[z].comments = _context7.sent;
                        images = [];
                        reviews = [];
                        scoreTotal = 0;
                        lPrice = 0;
                        mPrice = 0;
                        hPrice = 0;

                        for (i = 0; i < imagesMongo.length; i++) {
                          images.push(path.join('https://restaurantsakip1.herokuapp.com/' + imagesMongo[i].imageDir));
                        }

                        for (i = 0; i < reviewsMongo.length; i++) {
                          reviews.push(reviewsMongo[i]);
                          scoreTotal += reviewsMongo[i].score;

                          if (reviewsMongo[i].price == "Barato") {
                            lPrice++;
                          } else if (reviewsMongo[i].price == "Regular") {
                            mPrice++;
                          } else {
                            hPrice++;
                          }
                        } // flo


                        restaurantsMongo[z].images = images;
                        restaurantsMongo[z].reviews = reviews;

                        if (scoreTotal > 0) {
                          restaurantsMongo[z].stars = scoreTotal / reviewsMongo.length;
                        } else {
                          restaurantsMongo[z].stars = 5;
                        }

                        if (lPrice > mPrice && lPrice > hPrice) {
                          restaurantsMongo[z].price = "Barato";
                        } else if (hPrice > lPrice && hPrice > mPrice) {
                          restaurantsMongo[z].price = "Caro";
                        } else {
                          restaurantsMongo[z].price = "Regular";
                        }

                      case 39:
                        z++;
                        _context7.next = 16;
                        break;

                      case 42:
                        nombres = []; // Aplicar los filtros

                        if (name != "") {
                          for (i = 0; i < restaurantsMongo.length; i++) {
                            // console.log(restaurantsMongo[i].name);
                            if (restaurantsMongo[i].name.toLowerCase().includes(name.toLowerCase())) {
                              // restaurantsMongo.splice(i, 1);
                              nombres.push(restaurantsMongo[i]);
                            }
                          }
                        } else {
                          nombres = restaurantsMongo;
                        }

                        starsArray = [];

                        if (stars != null) {
                          for (i = 0; i < nombres.length; i++) {
                            // console.log(restaurantsMongo[i].name);
                            if (nombres[i].stars == stars) {
                              // restaurantsMongo.splice(i, 1);
                              starsArray.push(nombres[i]);
                            }
                          }
                        } else {
                          starsArray = nombres;
                        }

                        foodTypes = [];

                        if (foodType != -1) {
                          for (i = 0; i < starsArray.length; i++) {
                            // console.log(restaurantsMongo[i].name);
                            if (starsArray[i].foodType.includes(foodType)) {
                              // restaurantsMongo.splice(i, 1);
                              foodTypes.push(starsArray[i]);
                            }
                          }
                        } else {
                          foodTypes = starsArray;
                        }

                        distanceArray = [];

                        if (distance != []) {
                          from = {
                            lat: distance[1],
                            lon: distance[2]
                          };

                          for (i = 0; i < foodTypes.length; i++) {
                            to = {
                              lat: foodTypes[i].location[0],
                              lon: foodTypes[i].location[1]
                            }; // console.log(Distance.between(from, to));

                            if (Distance.between(from, to) <= Distance(distance[0] + ' km')) {
                              // restaurantsMongo.splice(i, 1);
                              distanceArray.push(starsArray[i]);
                            }
                          }
                        } else {
                          distanceArray = foodTypes;
                        }

                        pricesArray = [];

                        if (price != "") {
                          for (i = 0; i < distanceArray.length; i++) {
                            if (distanceArray[i].price == price) {
                              // restaurantsMongo.splice(i, 1);
                              pricesArray.push(starsArray[i]);
                            }
                          }
                        } else {
                          pricesArray = distanceArray;
                        }

                        res.json(pricesArray);

                      case 53:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x15, _x16) {
                return _ref8.apply(this, arguments);
              };
            }()); // const {restaurantId} = req.params;


          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()); // Agregar un restaurantes

router.post('/', _server.validateToken,
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var db, restaurant, result;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _database.connect)();

          case 2:
            db = _context9.sent;
            restaurant = {
              name: req.body.name,
              description: req.body.description,
              location: req.body.location,
              foodType: req.body.foodType,
              contact: req.body.contact,
              schedule: req.body.schedule
            };
            _context9.next = 6;
            return db.collection("restaurants").insertOne(restaurant);

          case 6:
            result = _context9.sent;
            res.json({
              "operation": "successful",
              "description": "Restaurante agregado exitosamente"
            });

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}()); // Editar

router.put('/:id', _server.validateToken,
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(req, res) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _server.jwt.verify(req.token, 'my_secret_token',
            /*#__PURE__*/
            function () {
              var _ref11 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee10(err, data) {
                var id, db, restaurant, result;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        if (!err) {
                          _context10.next = 4;
                          break;
                        }

                        res.sendStatus(403);
                        _context10.next = 13;
                        break;

                      case 4:
                        id = req.params.id;
                        _context10.next = 7;
                        return (0, _database.connect)();

                      case 7:
                        db = _context10.sent;
                        restaurant = {
                          name: req.body.name,
                          description: req.body.description,
                          location: req.body.location,
                          foodType: req.body.foodType,
                          contact: req.body.contact,
                          schedule: req.body.schedule
                        };
                        _context10.next = 11;
                        return db.collection("restaurants").updateOne({
                          _id: ObjectID(id)
                        }, restaurant);

                      case 11:
                        result = _context10.sent;
                        res.json({
                          "operation": "successful",
                          "description": "Restaurante editado exitosamente"
                        });

                      case 13:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));

              return function (_x21, _x22) {
                return _ref11.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}()); // Editar

router["delete"]('/:id', _server.validateToken,
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(req, res) {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _server.jwt.verify(req.token, 'my_secret_token',
            /*#__PURE__*/
            function () {
              var _ref13 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee12(err, data) {
                var id, db, result;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        if (!err) {
                          _context12.next = 4;
                          break;
                        }

                        res.sendStatus(403);
                        _context12.next = 12;
                        break;

                      case 4:
                        id = req.params.id;
                        _context12.next = 7;
                        return (0, _database.connect)();

                      case 7:
                        db = _context12.sent;
                        _context12.next = 10;
                        return db.collection("restaurants").updateOne({
                          _id: ObjectID(id)
                        });

                      case 10:
                        result = _context12.sent;
                        res.json({
                          "operation": "successful",
                          "description": "Restaurante eliminado exitosamente"
                        });

                      case 12:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              }));

              return function (_x25, _x26) {
                return _ref13.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;