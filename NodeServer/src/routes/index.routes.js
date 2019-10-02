import {Router} from 'express';
const router = Router();
import {validateToken, jwt} from '../server';

router.get('/', validateToken, (req, res) =>
{
  console.log(req.token);
  jwt.verify(req.token, 'my_secret_token', async (err, data)=>
  {
    if (err)
    {
        res.sendStatus(403);
    }
    else {
      res.render('admin');
    }
  });
}
);

export default router;
