import {Router} from 'express';
const router = Router();
const path = require('path');
const uuid = require('uuid');

// Para subir imagenes al server
const multer = require('multer');




// Propiedades para guardar la imagen
const storage = multer.diskStorage(
  {
    filename: (req, file, cb) => cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase()),
    destination: 'src/uploads'
  });

//Database connection
import {connect} from "../database";

// import {ObjectID} from "mongodb";

const {ObjectID} = require("mongodb");

//Middlewares

router.use(multer
(
  {
    storage: storage,
    dest: 'src/uploads',
    limits: {fileSize: 500000},
    fileFilter: (req, file, cb) =>
    {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));
      if(mimetype && extname){
        return cb(null, true);
      }
      cb("Error, el archivo debe ser una imagen valida")
    }
  }).single('file'));


// Consulta una imagen de un restaurante con el id de mongo
router.get('/:idRestaurante', async (req, res) => {
    const {idRestaurante} = req.params;

    const db = await connect();
    const result = await db.collection('images').find({idRestaurant: ObjectID(idRestaurante)}).toArray();
    // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
    // console.log(jsonResult);
    const images = [];

    // console.log(result.length);

    for (var i = 0; i < result.length; i++) {
      // res.push(result[i].imageDir)
      // console.log(result[i]);
      images.push(path.join('http://localhost:3000/' +result[i].imageDir));
    }
    res.json(images);

}
);

// Subir una imagen al server con id de mongo del restaurante
router.post('/:idRestaurant', async (req, res) => {
  const db = await connect();
  const {idRestaurant} = req.params;
  const image = req.file;

  const img =
  {
      idRestaurant: ObjectID(idRestaurant),
      imageDir: image.filename
  };

  const result = await db.collection('images').insertOne(img);
  console.log(req.file);
  res.send("Imagen agregada correctamente");

}
);



// Agregar un restaurantes
// router.post('/', async (req, res) =>
//     {
//         const db = await connect();
//         const restaurant =
//             {
//                 name: req.body.name,
//                 description: req.body.description,
//                 location: req.body.location,
//                 foodType: req.body.foodType,
//                 contact: req.body.contact,
//                 schedule: req.body.scheule
//             };
//         const result = await db.collection("restaurants").insertOne(restaurant);
//         res.send('Restaurante agregado exitosamente');
//     }
// );

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
