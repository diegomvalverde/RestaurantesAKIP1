import {Router} from 'express';
const router = Router();
const path = require('path');
import {validateToken, jwt} from '../server'


//Database connection
import {connect} from "../database";

// import {ObjectID} from "mongodb";

const {ObjectID} = require("mongodb");

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'nonreplayrestaurantsakip1@outlook.com',
    pass: 'RestaurantAkiP1'
  }
});

router.get('/:email/:password', async (req, res) =>
{
  const {email, password} = req.params;
  const user =
  {
    email,
    password
  }
  const browser = req.body.browser;
  const db = await connect();
  const userdb = await db.collection('users').findOne({email: email, password: password});

  // console.log(userdb);
  if (userdb != null) {
    const token = jwt.sign({user}, 'my_secret_token');
    userdb.token = token;
    res.json(userdb);

  } else {
    res.send("el usuario no existe");

  }

});


router.get('/', async (req, res) =>
{
  res.render('index', {title: "Restaurantes"});
});




router.get('/validatetoken', validateToken, (req, res) =>
{
  jwt.verify(req.token, 'my_secret_token', (err, data)=>
  {
    if (err)
    {
        res.send(false);
    }
    else {
      res.send(true);
    }
  });
});

router.get('/:email', async (req, res) =>
{
  const {email} = req.params;
  const db = await connect();
  const userdb = await db.collection('users').findOne({email: email});

    if (userdb != null)
    {
      var mailOptions = {
      from: 'nonreplayrestaurantsakip1@outlook.com',
        to: email,
        subject: 'Su nueva contraseña',
        text: 'Su contraseña es: ' + userdb.password
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
  }
  // jwt.verify(req.token, 'my_secret_token', (err, data)=>
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
});



export default router;
