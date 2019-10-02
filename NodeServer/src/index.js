// Mi api podrá ser ejecutada en distintos entornos
import '@babel/polyfill';

import app from './server';
const path = require('path');

async function main()
{
    await app.listen(app.get('port'));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    console.log('>>> Se ha iniciado en el puerto ', app.get('port'), " <<<")
}

main();
