
import express from 'express';
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');


export function validateToken(req, res, next)
{
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined')
  {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}

// Static files
app.use(express.static(path.join(__dirname, '../src/uploads/')));

// Config
app.set('port', process.env.PORT || 3000);

// Rutas
import IndexRoutes from './routes/index.routes';
import RestaurantsRoutes from './routes/restaurants.routes';
import UsersRoutes from './routes/users.routes';
import ReviewsRoutes from './routes/reviews.routes';
import ImagesRoutes from './routes/images.routes';
import LoginRoutes from './routes/login.routes';

// Middlewares

app.use(express.json());

app.use(IndexRoutes);
app.use('/restaurants', RestaurantsRoutes);
app.use('/users', UsersRoutes);
app.use('/reviews', ReviewsRoutes);
app.use('/images', ImagesRoutes);
app.use('/login', LoginRoutes);

export default app;
export {jwt};
