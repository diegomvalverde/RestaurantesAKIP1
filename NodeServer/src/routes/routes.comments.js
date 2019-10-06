import {Router} from 'express';
const router = Router();
import {connect} from "../database";
const {ObjectID} = require("mongodb");

// Agregar una review
router.post('/', async (req, res) =>
{
    // const {idRestaurant} = req.params;
    const db = await connect();
    const comment =
        {
            restaurantId: ObjectID(req.body.restaurantId),
            userId: ObjectID(req.body.userId),
            date: new Date().getDate(),
            comment: req.body.score,
        };

    const result = await db.collection("comments").insertOne(comment);
    res.send('Reseña agregada exitosamente');
    }
    );

export default router;
