import {Router} from 'express';
const router = Router();
import {connect} from "../database";
const {ObjectID} = require("mongodb");

// Agregar una review
router.post('/', async (req, res) =>
    {
      // const {idRestaurant} = req.params;
      const db = await connect();
      const review =
          {
              restaurantId: ObjectID(req.body.restaurantId),
              userId: ObjectID(req.body.userId),
              date: new Date().getDate(),
              score: req.body.score,
              price: req.body.price
          };
      const exists = await db.collection("reviews").findOne({restaurantId: review.restaurantId, userId: review.userId});
      if (exists != null)
      {
          const result = await db.collection("reviews").updateOne({_id: exists._id}, {$set: review});
      }
      else
      {
          const result = await db.collection("reviews").insertOne(review);
      }
      res.send('Reseña agregada exitosamente');
    }
);

export default router;
