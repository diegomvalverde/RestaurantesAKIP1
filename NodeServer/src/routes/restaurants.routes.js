import {Router} from 'express';
const router = Router();
const path = require('path');
import {validateToken, jwt} from "../server";
//Database connection
import {connect} from "../database";

// import {ObjectID} from "mongodb";

const {ObjectID} = require("mongodb");
// Consulta todos los restaurantes
router.get('/:restaurantId', validateToken, async (req, res) => {
  const {restaurantId} = req.params;
  console.log(req.body);
  jwt.verify(req.token, 'my_secret_token', async (err, data)=>
  {
    if (err)
    {
        res.sendStatus(403);
    }
    else {
      const db = await connect();
      // var restaurantsMongo = await db.collection('restaurants').findOne({_id: restaurantId});
      const restaurantsMongo = await db.collection('restaurants').findOne({_id: ObjectID(restaurantId)});


        const reviewsMongo = await db.collection('reviews').find({idRestaurant: ObjectID(restaurantId)}).toArray();
        const imagesMongo = await db.collection('images').find({idRestaurant: ObjectID(restaurantId)}).toArray();

        var images = [];
        var reviews = [];

        let scoreTotal = 0;

            for (var i = 0; i < imagesMongo.length; i++) {
              images.push(path.join('http://localhost:3000/' + imagesMongo[i].imageDir));
            }

            for (var i = 0; i < reviewsMongo.length; i++) {
              reviews.push(reviewsMongo[i]);
    		  scoreTotal += reviewsMongo[i].score;
            }

    		// float avgScore = scoreTotal/reviewsMongo.length;

        restaurantsMongo.images = images;
        restaurantsMongo.reviews = reviews;
        restaurantsMongo.score = scoreTotal/reviewsMongo.length;

      // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
      // console.log(jsonResult);
      res.json(restaurantsMongo);
    }
  });
    // const {restaurantId} = req.params;



}
);


// Consulta todos los restaurantes
router.get('/', validateToken, async (req, res) => {
  console.log(req.body);
  jwt.verify(req.token, 'my_secret_token', async (err, data)=>
  {
    if (err)
    {
        res.sendStatus(403);
    }
    else {
      const db = await connect();
      const restaurantsMongo = await db.collection('restaurants').find({}).toArray();

      for (var z = 0; z < restaurantsMongo.length; z++) {
        const restaurantId = restaurantsMongo[z]._id;

        const reviewsMongo = await db.collection('reviews').find({idRestaurant: ObjectID(restaurantId)}).toArray();
        const imagesMongo = await db.collection('images').find({idRestaurant: ObjectID(restaurantId)}).toArray();

        var images = [];
        var reviews = [];

        let scoreTotal = 0;

            for (var i = 0; i < imagesMongo.length; i++) {
              images.push(path.join('http://localhost:3000/' + imagesMongo[i].imageDir));
            }

            for (var i = 0; i < reviewsMongo.length; i++) {
              reviews.push(reviewsMongo[i]);
    		  scoreTotal += reviewsMongo[i].score;
            }

    		// flo

        restaurantsMongo[z].images = images;
        restaurantsMongo[z].reviews = reviews;
        restaurantsMongo[z].score = scoreTotal/reviewsMongo.length;

      }
      // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
      // console.log(jsonResult);
      res.json(restaurantsMongo);
    }
  });
    // const {restaurantId} = req.params;



}
);


// Consulta todos los restaurantes
router.get('/:foodtypes', async (req, res) => {
  const {foodtypes} = req.params;
  var food = [];
  if (foodtypes == "types")
  {
    const db = await connect();
    const result = await db.collection('foodtypes').find({}).toArray();

    for (var i = 0; i < result.length; i++)
    {
      food.push(result[i].foodtype);
    }
  }
    // const db = await connect();
    // const result = await db.collection('restaurants').find({}).toArray();
    // // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
    // // console.log(jsonResult);
    res.json(food);
}
);



// Agregar un restaurantes
router.post('/', async (req, res) =>
    {
        const db = await connect();
        const restaurant =
            {
                name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                foodType: req.body.foodType,
                contact: req.body.contact,
                schedule: req.body.schedule
            };

        const result = await db.collection("restaurants").insertOne(restaurant);
        res.json({"operation":"successful", "description": "Restaurante agregado exitosamente"});
    }
);

// Editar
router.put('/:id', async (req, res) =>
    {
      const {id} = req.params;
        const db = await connect();
        const restaurant =
            {
                name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                foodType: req.body.foodType,
                contact: req.body.contact,
                schedule: req.body.schedule
            };

        const result = await db.collection("restaurants").updateOne({_id: ObjectID(id)},restaurant);
        res.json({"operation":"successful", "description": "Restaurante editado exitosamente"});
    }
);


// Editar
router.delete('/:id', async (req, res) =>
    {
      const {id} = req.params;
        const db = await connect();

        const result = await db.collection("restaurants").updateOne({_id: ObjectID(id)});
        res.json({"operation":"successful", "description": "Restaurante eliminado exitosamente"});
    }
);

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

export default router;
