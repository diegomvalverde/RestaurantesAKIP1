import {Router} from 'express';
const router = Router();

// bluebird.promisifyAll(redis);

//Database connection
import {connect} from "../database";

// import {ObjectID} from "mongodb";

const {ObjectID} = require("mongodb");


// router.get('/', async (req, res) => {});


// router.get('/', async (req, res) => {
//     try {
//         const db = await connect();
//         const proveedores = await db.collection("proveedores").find({}, {proveedor: "", id: 0}).toArray();
//         // console.log(proveedores);
//         const products = [];
//         for (let i = 0; i < proveedores.length; i++) {
//             const prov = proveedores[i].proveedor;
//             try {
//
//                 const pro = await db.collection("productos").find({proveedor: prov}).toArray();
//                 // console.log(pro[0].proveedor);
//                 const prod = {proveedor:prov, online:1, productos:pro[0].productos};
//                 redisClient.set(pro[0].proveedor, JSON.stringify(prod));
//                 products.push(prod);
//
//             }
//             catch(e) {
//                 // console.log(e)
//                 if(await redisClient.exists(prov))
//                 {
//                     const jsonProductos = JSON.parse(await getAsync(prov));
//                     // console.log(JSON.parse(productos));
//                     const prod = {proveedor:prov, online:0, productos:jsonProductos.productos};
//                     redisClient.set(prov, JSON.stringify(prod));
//                     products.push(prod);
//                 }
//             }
//         }
//         // const result = await db.collection("productos").find({}).toArray();
//         // console.log(proveedores[0].proveedor);
//         // console.log(proveedores);
//         res.json(products);
//     }
//     catch(e)
//     {
//
//     }
//     }
//
// );

// Consulta un restaurante por nombre
router.get('/:nombreRestaurante', async (req, res) => {
    const {nombreRestaurante} = req.params;

    const db = await connect();
    const result = await db.collection('restaurants').findOne({name: nombreRestaurante});
    // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
    // console.log(jsonResult);
    res.json(result);

}
);

// Consulta todos los restaurantes
router.get('/', async (req, res) => {

    const db = await connect();
    const result = await db.collection('restaurants').find({}).toArray();
    // const jsonResult = {proveedor:result[0].proveedor, online:1, productos:result[0].productos};
    // console.log(jsonResult);
    res.json(result);

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
                schedule: req.body.scheule
            };
        const result = await db.collection("restaurants").insertOne(restaurant);
        res.send('Restaurante agregado exitosamente');
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
