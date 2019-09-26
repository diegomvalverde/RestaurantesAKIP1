"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _database = require("../database");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();

var path = require('path'); // bluebird.promisifyAll(redis);
//Database connection


// import {ObjectID} from "mongodb";
var _require = require("mongodb"),
    ObjectID = _require.ObjectID; // router.get('/', async (req, res) => {});
// router.get('/', async (req, res) => {
//     try {
//         const db = await connect();
//         const proveedores = await db.collection("proveedores").find({}, {proveedor: "", id: 0}).toArray();
//         // console.log(proveedores);
//         const products = [];
//         for (let i = 0; i < proveedores.length; i++) {
//             const prov = proveedores[i].proveedor;
//             try {
//
//                 const pro = await db.collection("productos").find({proveedor: prov}).toArray();
//                 // console.log(pro[0].proveedor);
//                 const prod = {proveedor:prov, online:1, productos:pro[0].productos};
//                 redisClient.set(pro[0].proveedor, JSON.stringify(prod));
//                 products.push(prod);
//
//             }
//             catch(e) {
//                 // console.log(e)
//                 if(await redisClient.exists(prov))
//                 {
//                     const jsonProductos = JSON.parse(await getAsync(prov));
//                     // console.log(JSON.parse(productos));
//                     const prod = {proveedor:prov, online:0, productos:jsonProductos.productos};
//                     redisClient.set(prov, JSON.stringify(prod));
//                     products.push(prod);
//                 }
//             }
//         }
//         // const result = await db.collection("productos").find({}).toArray();
//         // console.log(proveedores[0].proveedor);
//         // console.log(proveedores);
//         res.json(products);
//     }
//     catch(e)
//     {
//
//     }
//     }
//
// );
// Consulta un restaurante por id de mongo


router.get('/:restaurantId',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var restaurantId, db, info, reviewsMongo, imagesMongo, images, reviews, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            restaurantId = req.params.restaurantId;
            _context.next = 3;
            return (0, _database.connect)();

          case 3:
            db = _context.sent;
            _context.next = 6;
            return db.collection('restaurants').findOne({
              _id: ObjectID(restaurantId)
            });

          case 6:
            info = _context.sent;
            _context.next = 9;
            return db.collection('reviews').find({
              idRestaurant: ObjectID(restaurantId)
            }).toArray();

          case 9:
            reviewsMongo = _context.sent;
            _context.next = 12;
            return db.collection('images').find({
              idRestaurant: ObjectID(restaurantId)
            }).toArray();

          case 12:
            imagesMongo = _context.sent;
            images = [];
            reviews = [];

            for (i = 0; i < imagesMongo.length; i++) {
              images.push(path.join('http://localhost:3000/' + imagesMongo[i].imageDir));
            }

            for (i = 0; i < reviewsMongo.length; i++) {
              reviews.push(reviewsMongo[i]);
            }

            info.images = images;
            info.reviews = reviews; // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
            // console.log(jsonResult);

            res.json(info);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Consulta todos los restaurantes

router.get('/',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var db, restaurantsMongo, z, restaurantId, reviewsMongo, imagesMongo, images, reviews, i;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _database.connect)();

          case 2:
            db = _context2.sent;
            _context2.next = 5;
            return db.collection('restaurants').find({}).toArray();

          case 5:
            restaurantsMongo = _context2.sent;
            z = 0;

          case 7:
            if (!(z < restaurantsMongo.length)) {
              _context2.next = 24;
              break;
            }

            restaurantId = restaurantsMongo[z]._id;
            _context2.next = 11;
            return db.collection('reviews').find({
              idRestaurant: ObjectID(restaurantId)
            }).toArray();

          case 11:
            reviewsMongo = _context2.sent;
            _context2.next = 14;
            return db.collection('images').find({
              idRestaurant: ObjectID(restaurantId)
            }).toArray();

          case 14:
            imagesMongo = _context2.sent;
            images = [];
            reviews = [];

            for (i = 0; i < imagesMongo.length; i++) {
              images.push(path.join('http://localhost:3000/' + imagesMongo[i].imageDir));
            }

            for (i = 0; i < reviewsMongo.length; i++) {
              reviews.push(reviewsMongo[i]);
            }

            restaurantsMongo[z].images = images;
            restaurantsMongo[z].reviews = reviews;

          case 21:
            z++;
            _context2.next = 7;
            break;

          case 24:
            // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
            // console.log(jsonResult);
            res.json(restaurantsMongo);

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // Consulta todos los restaurantes

router.get('/',
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var db, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _database.connect)();

          case 2:
            db = _context3.sent;
            _context3.next = 5;
            return db.collection('restaurants').find({}).toArray();

          case 5:
            result = _context3.sent;
            // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
            // console.log(jsonResult);
            res.json(result);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // Agregar un restaurantes

router.post('/',
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var db, restaurant, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _database.connect)();

          case 2:
            db = _context4.sent;
            restaurant = {
              name: req.body.name,
              description: req.body.description,
              location: req.body.location,
              foodType: req.body.foodType,
              contact: req.body.contact,
              schedule: req.body.schedule
            };
            _context4.next = 6;
            return db.collection("restaurants").insertOne(restaurant);

          case 6:
            result = _context4.sent;
            res.send('Restaurante agregado exitosamente');

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
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