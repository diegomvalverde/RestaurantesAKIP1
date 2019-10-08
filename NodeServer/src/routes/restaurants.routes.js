import {Router} from 'express';
const router = Router();
const path = require('path');
import {validateToken, jwt} from "../server";
import {connect} from "../database"; //Database connection
const {ObjectID} = require("mongodb");
const Distance = require("geo-distance");

// Consulta un restaurante por el id
router.get('/:restaurantId', validateToken, async (req, res) => {
  const {restaurantId} = req.params;
  jwt.verify(req.token, 'my_secret_token', async (err, data)=>
  {
    if (err)
    {
        res.sendStatus(403);
    }
    else
    {
      const db = await connect();
      const restaurantsMongo = await db.collection('restaurants').findOne({_id: ObjectID(restaurantId)});


        const reviewsMongo = await db.collection('reviews').find({restaurantId: ObjectID(restaurantId)}).toArray();
        const imagesMongo = await db.collection('images').find({idRestaurant: ObjectID(restaurantId)}).toArray();
        restaurantsMongo.comments = await db.collection('comments').find({restaurantId: ObjectID(restaurantId)}).toArray();

        var images = [];
        var reviews = [];
        var comments = [];

        let scoreTotal = 0;
        var lPrice = 0;
        var mPrice = 0;
        var hPrice = 0;


        for (var i = 0; i < imagesMongo.length; i++) {
          images.push(path.join('http://localhost:3000/' + imagesMongo[i].imageDir));
        }
        // for (var i = 0; i < commentsMongo.length; i++) {
        //     comments.push(commentsMongo[i]);
        //
        // }

        for (var i = 0; i < reviewsMongo.length; i++) {
          reviews.push(reviewsMongo[i]);
          scoreTotal += reviewsMongo[i].score;
            if (reviewsMongo[i].price == "barato")
            {
                lPrice ++;
            }
            else if (reviewsMongo[i].price == "regular")
            {
                mPrice++;
            }
            else
            {
                hPrice ++;
            }
        }

    		// float avgScore = scoreTotal/reviewsMongo.length;

        restaurantsMongo.images = images;
        restaurantsMongo.reviews = reviews;
        if (scoreTotal > 0)
        {
            restaurantsMongo.stars = scoreTotal/reviewsMongo.length;
        }
        else
        {
            restaurantsMongo.stars = 5;
        }
        // restaurantsMongo.score = scoreTotal/reviewsMongo.length;
        if (lPrice > mPrice && lPrice > hPrice)
        {
            restaurantsMongo.price = "barato";
        }
        else if (hPrice > lPrice && hPrice > mPrice)
        {
            restaurantsMongo.price = "caro";
        }
        else
        {
            restaurantsMongo.price = "regular";
        }

      // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
      // console.log(jsonResult);
      res.json(restaurantsMongo);
    }
  });
    // const {restaurantId} = req.params;



}
);

// Obtener restaurantes sin filtro
router.get('/', validateToken, async (req, res) => {
    jwt.verify(req.token, 'my_secret_token', async (err, data)=>
        {
            if (err)
            {
                res.sendStatus(403);
            }
            else
    {
        const db = await connect();
        var restaurantsMongo = await db.collection('restaurants').find({}).toArray();

        for (var z = 0; z < restaurantsMongo.length; z++)
        {
            const restaurantId = restaurantsMongo[z]._id;

            const reviewsMongo = await db.collection('reviews').find({restaurantId: ObjectID(restaurantId)}).toArray();
            const imagesMongo = await db.collection('images').find({idRestaurant: ObjectID(restaurantId)}).toArray();
            restaurantsMongo[z].comments = await db.collection('comments').find({restaurantId: ObjectID(restaurantId)}).toArray();
            var images = [];
            var reviews = [];

            var scoreTotal = 0;
            var lPrice = 0;
            var mPrice = 0;
            var hPrice = 0;

            for (var i = 0; i < imagesMongo.length; i++) {
                images.push(path.join('http://localhost:3000/' + imagesMongo[i].imageDir));
            }

            for (var i = 0; i < reviewsMongo.length; i++) {
                reviews.push(reviewsMongo[i]);
                scoreTotal += reviewsMongo[i].score;
                if (reviewsMongo[i].price == "barato")
                {
                    lPrice ++;
                }
                else if (reviewsMongo[i].price == "regular")
                {
                    mPrice++;
                }
                else
                {
                    hPrice ++;
                }
            }

            // flo

            restaurantsMongo[z].images = images;
            restaurantsMongo[z].reviews = reviews;
            if (scoreTotal > 0)
            {
                restaurantsMongo[z].stars = scoreTotal/reviewsMongo.length;
            }
            else
            {
                restaurantsMongo[z].stars = 5;
            }
            if (lPrice > mPrice && lPrice > hPrice)
            {
                restaurantsMongo[z].price = "barato";
            }
            else if (hPrice > lPrice && hPrice > mPrice)
            {
                restaurantsMongo[z].price = "caro";
            }
            else
            {
                restaurantsMongo[z].price = "regular";
            }


        }
    res.json(restaurantsMongo);
}
});
// const {restaurantId} = req.params;



}
);


// Consulta todos los restaurantes con filtro
router.post('/filter/', validateToken, async (req, res) => {
  jwt.verify(req.token, 'my_secret_token', async (err, data)=>
  {
    if (err)
    {
        res.sendStatus(403);
    }
    else
    {
        // Constantes para hacer los filtros
        const name = req.body.name;
        const stars = req.body.stars;
        const price = req.body.price;
        const foodType = req.body.foodType;
        const distance = req.body.distance;

        const db = await connect();
        var restaurantsMongo = await db.collection('restaurants').find({}).toArray();

        for (var z = 0; z < restaurantsMongo.length; z++)
        {
            const restaurantId = restaurantsMongo[z]._id;

            const reviewsMongo = await db.collection('reviews').find({restaurantId: ObjectID(restaurantId)}).toArray();
            const imagesMongo = await db.collection('images').find({idRestaurant: ObjectID(restaurantId)}).toArray();
            restaurantsMongo[z].comments = await db.collection('comments').find({restaurantId: ObjectID(restaurantId)}).toArray();
            var images = [];
            var reviews = [];

            var scoreTotal = 0;
            var lPrice = 0;
            var mPrice = 0;
            var hPrice = 0;

            for (var i = 0; i < imagesMongo.length; i++) {
              images.push(path.join('http://localhost:3000/' + imagesMongo[i].imageDir));
            }

            for (var i = 0; i < reviewsMongo.length; i++) {
              reviews.push(reviewsMongo[i]);
              scoreTotal += reviewsMongo[i].score;
              if (reviewsMongo[i].price == "barato")
              {
                  lPrice ++;
              }
              else if (reviewsMongo[i].price == "regular")
              {
                  mPrice++;
              }
              else
              {
                  hPrice ++;
              }
            }

            // flo

            restaurantsMongo[z].images = images;
            restaurantsMongo[z].reviews = reviews;
            if (scoreTotal > 0)
            {
                restaurantsMongo[z].stars = scoreTotal/reviewsMongo.length;
            }
            else
            {
                restaurantsMongo[z].stars = 5;
            }
            if (lPrice > mPrice && lPrice > hPrice)
            {
                restaurantsMongo[z].price = "barato";
            }
            else if (hPrice > lPrice && hPrice > mPrice)
            {
                restaurantsMongo[z].price = "caro";
            }
            else
            {
                restaurantsMongo[z].price = "regular";
            }


        }

        var nombres = [];
        // Aplicar los filtros
        if (name != null)
        {
            for (var i = 0; i < restaurantsMongo.length; i++)
            {
                // console.log(restaurantsMongo[i].name);
                if (restaurantsMongo[i].name.toLowerCase().includes(name.toLowerCase()))
                {
                    // restaurantsMongo.splice(i, 1);
                    nombres.push(restaurantsMongo[i]);
                }
            }
        }
        else
        {
            nombres = restaurantsMongo;
        }

        var starsArray = [];
        if (stars != null)
        {
            for (var i = 0; i < nombres.length; i++)
            {
                // console.log(restaurantsMongo[i].name);
                if (nombres[i].stars == stars)
                {
                    // restaurantsMongo.splice(i, 1);
                    starsArray.push(nombres[i]);
                }
            }
        }
        else
        {
            starsArray = nombres;
        }

        var foodTypes = [];
        if (foodType != null)
        {
            for (var i = 0; i < starsArray.length; i++)
            {
                // console.log(restaurantsMongo[i].name);
                if (starsArray[i].foodType.includes(foodType))
                {
                    // restaurantsMongo.splice(i, 1);
                    foodTypes.push(starsArray[i]);
                }
            }
        }
        else
        {
            foodTypes = starsArray;
        }

        var distanceArray = [];
        if (distance != null)
        {
            const from =
                {
                    lat: distance[1],
                    lon: distance[2]
                }
            for (var i = 0; i < foodTypes.length; i++)
            {
                var to =
                    {
                        lat: foodTypes[i].location[0],
                        lon: foodTypes[i].location[1]
                    }
                // console.log(Distance.between(from, to));
                if (Distance.between(from, to) <= Distance(distance[0] + ' km') )
                {
                    // restaurantsMongo.splice(i, 1);
                    distanceArray.push(starsArray[i]);
                }
            }
        }
        else
        {
            distanceArray = foodTypes;
        }

        var pricesArray = [];
        if (price != null)
        {
            for (var i = 0; i < distanceArray.length; i++)
            {
                if (distanceArray[i].price == price)
                {
                    // restaurantsMongo.splice(i, 1);
                    pricesArray.push(starsArray[i]);
                }
            }
        }
        else
        {
            pricesArray = distanceArray;
        }

      res.json(pricesArray);
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
