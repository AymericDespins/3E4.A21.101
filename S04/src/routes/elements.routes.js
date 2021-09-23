import express from 'express';
import HttpError from 'http-errors';
import httpStatus from 'http-status';

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
        res.status(200);
        res.set("Content-Type", "application/json");       
        res.send(ELEMENTS);
    }

    getOne(req, res, next) {
        const idElement = req.params.idElement;      
        const elements = ELEMENTS.find(e=>e.id == idElement)      

        if(!elements){
            return next(HttpError.NotFound(`L'élément avec le id ${idElement} n'existe pas.`));
        }
        else{
            res.status(200);
            res.json(elements);
        }
    }

    post(req, res, next) {
        const newElement = req.body;

        const elements = ELEMENTS.find(e=>e.symbol == newElement.symbol)
            if(elements)
            {
                return next(HttpError.Conflict(`l'élément avec l'id ${newElement} existe déjà.`));
            }
            else{
                ELEMENTS.push(newElement);
                res.status(httpStatus.CREATED); //201
                res.json(newElement);
            }
        
    }
    
    delete(req, res, next) {
        const symbol = req.params.symbol;

        const index = ELEMENTS.findIndex(e=>e.symbol == symbol)
        if(index == -1)
            {     
                return next(HttpError.NotFound(`L'élément avec le SYMBOL ${symbol} n'existe pas.`));
            }
            else
            {
                //La planete existe
                ELEMENTS.splice(index, 1);
                res.status(httpStatus.NO_CONTENT).end();
            }
    }
}

new ElementsRoutes();
export default router;