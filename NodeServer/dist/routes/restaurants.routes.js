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

var Distance = require("geo-distance"); // Consulta un restaurante por el id


router.get('/:restaurantId', _server.validateToken,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var restaurantId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            restaurantId = req.params.restaurantId;

            _server.jwt.verify(req.token, 'my_secret_token',
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(err, data) {
                var db, restaurantsMongo, reviewsMongo, imagesMongo, images, reviews, comments, scoreTotal, lPrice, mPrice, hPrice, i;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 4;
                          break;
                        }

                        res.sendStatus(403);
                        _context.next = 33;
                        break;

                      case 4:
                        _context.next = 6;
                        return (0, _database.connect)();

                      case 6:
                        db = _context.sent;
                        _context.next = 9;
                        return db.collection('restaurants').findOne({
                          _id: ObjectID(restaurantId)
                        });

                      case 9:
                        restaurantsMongo = _context.sent;
                        _context.next = 12;
                        return db.collection('reviews').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 12:
                        reviewsMongo = _context.sent;
                        _context.next = 15;
                        return db.collection('images').find({
                          idRestaurant: ObjectID(restaurantId)
                        }).toArray();

                      case 15:
                        imagesMongo = _context.sent;
                        _context.next = 18;
                        return db.collection('comments').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 18:
                        restaurantsMongo.comments = _context.sent;
                        images = [];
                        reviews = [];
                        comments = [];
                        scoreTotal = 0;
                        lPrice = 0;
                        mPrice = 0;
                        hPrice = 0;

                        for (i = 0; i < imagesMongo.length; i++) {
                          images.push(path.join('http://localhost:3000/' + imagesMongo[i].imageDir));
                        } // for (var i = 0; i < commentsMongo.length; i++) {
                        //     comments.push(commentsMongo[i]);
                        //
                        // }


                        for (i = 0; i < reviewsMongo.length; i++) {
                          reviews.push(reviewsMongo[i]);
                          scoreTotal += reviewsMongo[i].score;

                          if (reviewsMongo[i].price == "barato") {
                            lPrice++;
                          } else if (reviewsMongo[i].price == "regular") {
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
                          restaurantsMongo.price = "barato";
                        } else if (hPrice > lPrice && hPrice > mPrice) {
                          restaurantsMongo.price = "caro";
                        } else {
                          restaurantsMongo.price = "regular";
                        } // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
                        // console.log(jsonResult);


                        res.json(restaurantsMongo);

                      case 33:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }()); // const {restaurantId} = req.params;


          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Consulta todos los restaurantes

router.get('/', _server.validateToken,
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _server.jwt.verify(req.token, 'my_secret_token',
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(err, data) {
                var name, stars, price, foodType, distance, db, restaurantsMongo, z, restaurantId, reviewsMongo, imagesMongo, images, reviews, scoreTotal, lPrice, mPrice, hPrice, i, nombres, starsArray, foodTypes, distanceArray, from, to, pricesArray;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!err) {
                          _context3.next = 4;
                          break;
                        }

                        res.sendStatus(403);
                        _context3.next = 53;
                        break;

                      case 4:
                        // Constantes para hacer los filtros
                        name = req.body.name;
                        stars = req.body.stars;
                        price = req.body.price;
                        foodType = req.body.foodType;
                        distance = req.body.distance;
                        _context3.next = 11;
                        return (0, _database.connect)();

                      case 11:
                        db = _context3.sent;
                        _context3.next = 14;
                        return db.collection('restaurants').find({}).toArray();

                      case 14:
                        restaurantsMongo = _context3.sent;
                        z = 0;

                      case 16:
                        if (!(z < restaurantsMongo.length)) {
                          _context3.next = 42;
                          break;
                        }

                        restaurantId = restaurantsMongo[z]._id;
                        _context3.next = 20;
                        return db.collection('reviews').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 20:
                        reviewsMongo = _context3.sent;
                        _context3.next = 23;
                        return db.collection('images').find({
                          idRestaurant: ObjectID(restaurantId)
                        }).toArray();

                      case 23:
                        imagesMongo = _context3.sent;
                        _context3.next = 26;
                        return db.collection('comments').find({
                          restaurantId: ObjectID(restaurantId)
                        }).toArray();

                      case 26:
                        restaurantsMongo[z].comments = _context3.sent;
                        images = [];
                        reviews = [];
                        scoreTotal = 0;
                        lPrice = 0;
                        mPrice = 0;
                        hPrice = 0;

                        for (i = 0; i < imagesMongo.length; i++) {
                          images.push(path.join('http://localhost:3000/' + imagesMongo[i].imageDir));
                        }

                        for (i = 0; i < reviewsMongo.length; i++) {
                          reviews.push(reviewsMongo[i]);
                          scoreTotal += reviewsMongo[i].score;

                          if (reviewsMongo[i].price == "barato") {
                            lPrice++;
                          } else if (reviewsMongo[i].price == "regular") {
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
                          restaurantsMongo[z].price = "barato";
                        } else if (hPrice > lPrice && hPrice > mPrice) {
                          restaurantsMongo[z].price = "caro";
                        } else {
                          restaurantsMongo[z].price = "regular";
                        }

                      case 39:
                        z++;
                        _context3.next = 16;
                        break;

                      case 42:
                        nombres = []; // Aplicar los filtros

                        if (name != null) {
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

                        if (foodType != null) {
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

                        if (distance != null) {
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

                        if (price != null) {
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
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x7, _x8) {
                return _ref4.apply(this, arguments);
              };
            }()); // const {restaurantId} = req.params;


          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // Consulta todos los restaurantes

router.get('/:foodtypes',
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var foodtypes, food, db, result, i;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            foodtypes = req.params.foodtypes;
            food = [];

            if (!(foodtypes == "types")) {
              _context5.next = 10;
              break;
            }

            _context5.next = 5;
            return (0, _database.connect)();

          case 5:
            db = _context5.sent;
            _context5.next = 8;
            return db.collection('foodtypes').find({}).toArray();

          case 8:
            result = _context5.sent;

            for (i = 0; i < result.length; i++) {
              food.push(result[i].foodtype);
            }

          case 10:
            // const db = await connect();
            // const result = await db.collection('restaurants').find({}).toArray();
            // // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
            // // console.log(jsonResult);
            res.json(food);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); // Agregar un restaurantes

router.post('/',
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var db, restaurant, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _database.connect)();

          case 2:
            db = _context6.sent;
            restaurant = {
              name: req.body.name,
              description: req.body.description,
              location: req.body.location,
              foodType: req.body.foodType,
              contact: req.body.contact,
              schedule: req.body.schedule
            };
            _context6.next = 6;
            return db.collection("restaurants").insertOne(restaurant);

          case 6:
            result = _context6.sent;
            res.json({
              "operation": "successful",
              "description": "Restaurante agregado exitosamente"
            });

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()); // Editar

router.put('/:id',
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var id, db, restaurant, result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.next = 3;
            return (0, _database.connect)();

          case 3:
            db = _context7.sent;
            restaurant = {
              name: req.body.name,
              description: req.body.description,
              location: req.body.location,
              foodType: req.body.foodType,
              contact: req.body.contact,
              schedule: req.body.schedule
            };
            _context7.next = 7;
            return db.collection("restaurants").updateOne({
              _id: ObjectID(id)
            }, restaurant);

          case 7:
            result = _context7.sent;
            res.json({
              "operation": "successful",
              "description": "Restaurante editado exitosamente"
            });

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()); // Editar

router["delete"]('/:id',
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var id, db, result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.next = 3;
            return (0, _database.connect)();

          case 3:
            db = _context8.sent;
            _context8.next = 6;
            return db.collection("restaurants").updateOne({
              _id: ObjectID(id)
            });

          case 6:
            result = _context8.sent;
            res.json({
              "operation": "successful",
              "description": "Restaurante eliminado exitosamente"
            });

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}()); // router.put('/:idProveedor/:idProducto', async (req, res) =>
//     {
//         const {idProveedor, idProducto} = req.params;
//         const db = await connect();
//         const result = await db.collection("productos").updateOne({_id: ObjectID(idProveedor), "productos.nombre" : idProducto}, {$inc: {"productos.$.inventario": -1}});
//
//         // console.log(result.ops[0]);
//         res.send('Compra exitosa');
//     }
// );

var _default = router;
exports["default"] = _default;