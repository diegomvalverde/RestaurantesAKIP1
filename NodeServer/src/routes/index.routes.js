import {Router} from 'express';
const router = Router();

router.get('/', (req, res) =>
{
    res.send('Bienvenido a la busqueda de restaurantes.' +
        '\n' +
        ' Esperamos que encuentres el indicado.')
}
);

export default router;
