import express from 'express';
import dayjs from 'dayjs';

import methodMiddlewares from './middlewares/method.js';
import errorsMiddlewares from './middlewares/errors.js';

import planetsRoutes from './routes/planets.routes.js';

const app = express();

app.use(methodMiddlewares);
app.use(planetsRoutes);

app.get('/premiere', (req,res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('Notre première route avec express'); // On a le droit à 1 seul 'Send' par boucle (fin de la boucle)
});

app.get('/date', (req,res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');

    res.send(dayjs().format("YYYY-MM-DD HH:mm"));
})

app.get('/maths/:operation', (req,res) => {

    const operation = req.params.operation;
    console.log(operation);

    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    let result = 0;
    switch(operation){
        case 'somme':
            result = a + b;
            break;
        case 'difference':
            result = a - b;
            break;
        case 'produit':
            result = a * b;
            break;
        case 'quotient':
            result = a / b;
            break;
        case 'reste':
            result = a % b;
            break;
        default:
            res.status(400);
            return res.send('Opération non reconnue');
    };

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(`${result}`);
})

app.use(errorsMiddlewares);

export default app;