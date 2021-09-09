import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import ELEMENTS from '../data/elements.js';

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
       res.status(HttpStatus.OK);
       
       res.set('Content-Type', 'application/json');

       res.send(ELEMENTS);
    }

    getOne(req, res, next) {
       const symbol = req.params.symbol;
       console.log(symbol);

       const element = ELEMENTS.find(e => e.symbol == symbol);

       if(!element) {
        
        return next(HttpError.NotFound(`L'element avec le symbol ${sElement} n'existe pas.`));
    } else {
        
        res.status(200).json(element); // fait Content-Type et Send la reponse
    }
    }

    post(req, res, next) {
        const newElement = req.body;

        const element = ELEMENTS.find(e => e.symbol == newElement.symbol); 
        if(element) {
            // J'ai un doublon === ERREUR
            return next(HttpError.Conflict(`L'element avec le symbol ${newElement.symbol} existe déjà.`));
        } else {
            
            ELEMENTS.push(newElement);
            
            res.status(HttpStatus.CREATED); // 201
            res.json(newElement);

        }
        
    }
    
    delete(req, res, next) {
        const symbol = req.params.symbol;
        console.log(symbol);

        const index = ELEMENTS.findIndex(e => e.symbol == symbol);

        if(index == -1) {
            return next(HttpError.NotFound(`L'element avec le symbol ${symbol} n'existe pas.`));
        } else {
            ELEMENTS.splice(index, 1);
            res.status(HttpStatus.NO_CONTENT).end(); // 204
        }
    }
}

new ElementsRoutes();

export default router;