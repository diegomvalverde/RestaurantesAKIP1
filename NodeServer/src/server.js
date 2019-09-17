
import express from 'express';

const app = express();

// Config
app.set('port', process.env.PORT || 3000);

// Rutas
import IndexRoutes from './routes/index.routes';
import RestaurantsRoutes from './routes/restaurants.routes';
import UsersRoutes from './routes/users.routes';
import ReviewsRoutes from './routes/reviews.routes';
import ImagesRoutes from './routes/images.routes';


// Middlewares

app.use(express.json());

app.use(IndexRoutes);
app.use('/restaurants', RestaurantsRoutes);
app.use('/users', UsersRoutes);
app.use('/reviews', ReviewsRoutes);
app.use('/images', ImagesRoutes);

export default app;
