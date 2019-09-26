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

var path = require('path');

var uuid = require('uuid'); // Para subir imagenes al server


var multer = require('multer'); // Propiedades para guardar la imagen


var storage = multer.diskStorage({
  filename: function filename(req, file, cb) {
    return cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
  },
  destination: 'src/uploads'
}); //Database connection

// import {ObjectID} from "mongodb";
var _require = require("mongodb"),
    ObjectID = _require.ObjectID; //Middlewares


router.use(multer({
  storage: storage,
  dest: 'src/uploads',
  limits: {
    fileSize: 500000
  },
  fileFilter: function fileFilter(req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error, el archivo debe ser una imagen valida");
  }
}).single('file')); // router.get('/', async (req, res) => {});
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
// Consulta una imagen de un restaurante con el id de mongo

router.get('/:idRestaurante',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var idRestaurante, db, result, images, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            idRestaurante = req.params.idRestaurante;
            _context.next = 3;
            return (0, _database.connect)();

          case 3:
            db = _context.sent;
            _context.next = 6;
            return db.collection('images').find({
              idRestaurant: ObjectID(idRestaurante)
            }).toArray();

          case 6:
            result = _context.sent;
            // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
            // console.log(jsonResult);
            images = []; // console.log(result.length);

            for (i = 0; i < result.length; i++) {
              // res.push(result[i].imageDir)
              // console.log(result[i]);
              images.push(path.join('http://localhost:3000/' + result[i].imageDir));
            }

            res.json(images);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Subir una imagen al server con id de mongo del restaurante

router.post('/:idRestaurant',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var db, idRestaurant, image, img, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _database.connect)();

          case 2:
            db = _context2.sent;
            idRestaurant = req.params.idRestaurant;
            image = req.file;
            img = {
              idRestaurant: ObjectID(idRestaurant),
              imageDir: image.filename
            };
            _context2.next = 8;
            return db.collection('images').insertOne(img);

          case 8:
            result = _context2.sent;
            console.log(req.file);
            res.send("Imagen agregada correctamente");

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // Agregar un restaurantes
// router.post('/', async (req, res) =>
//     {
//         const db = await connect();
//         const restaurant =
//             {
//                 name: req.body.name,
//                 description: req.body.description,
//                 location: req.body.location,
//                 foodType: req.body.foodType,
//                 contact: req.body.contact,
//                 schedule: req.body.scheule
//             };
//         const result = await db.collection("restaurants").insertOne(restaurant);
//         res.send('Restaurante agregado exitosamente');
//     }
// );
// router.put('/:idProveedor/:idProducto', async (req, res) =>
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