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

// import {ObjectID} from "mongodb";
var _require = require("mongodb"),
    ObjectID = _require.ObjectID;

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'nonreplayrestaurantsakip1@outlook.com',
    pass: 'RestaurantAkiP1'
  }
});
router.get('/:email/:password',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$params, email, password, user, browser, db, userdb, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, email = _req$params.email, password = _req$params.password;
            user = {
              email: email,
              password: password
            };
            browser = req.body.browser;
            _context.next = 5;
            return (0, _database.connect)();

          case 5:
            db = _context.sent;
            _context.next = 8;
            return db.collection('users').findOne({
              email: email,
              password: password
            });

          case 8:
            userdb = _context.sent;

            // console.log(userdb);
            if (userdb != null) {
              token = _server.jwt.sign({
                user: user
              }, 'my_secret_token');
              userdb.token = token;
              res.json(userdb);
            } else {
              res.send("el usuario no existe");
            }

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
}());
router.get('/',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res.render('index', {
              title: "Restaurantes"
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/validatetoken', _server.validateToken, function (req, res) {
  _server.jwt.verify(req.token, 'my_secret_token', function (err, data) {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});
router.get('/:email',
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var email, db, userdb, mailOptions;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = req.params.email;
            _context3.next = 3;
            return (0, _database.connect)();

          case 3:
            db = _context3.sent;
            _context3.next = 6;
            return db.collection('users').findOne({
              email: email
            });

          case 6:
            userdb = _context3.sent;

            if (userdb != null) {
              mailOptions = {
                from: 'nonreplayrestaurantsakip1@outlook.com',
                to: email,
                subject: 'Su nueva contraseña',
                text: 'Su contraseña es: ' + userdb.password
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            } // jwt.verify(req.token, 'my_secret_token', (err, data)=>
            // {
            //   if (err)
            //   {
            //       res.send(false);
            //   }
            //   else {
            //     res.send(true);
            //   }
            // });\


            res.send("Enviado al correo");

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;