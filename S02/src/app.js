import express from 'express';
import dayjs from 'dayjs';

const app = express();

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

app.get('/somme', (req,res) => {

    console.log(req.query);

    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(`Valeur de a : ${a}\nValeur de b : ${b}\nSomme: ${a+b}`);
})

export default app;