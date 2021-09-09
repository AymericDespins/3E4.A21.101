import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js'; // Possible de Import, car il y a un export dans le fichier planets.js

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        // Definition des routes pour la ressource Planet
        router.get('/', this.getAll);    // Retrieve toutes les planetes => "quand tu arrives sur /planets, fait getAll"
        router.get('/:idPlanet', this.getOne);
        router.post('/', this.post);
        router.delete('/:idPlanet', this.deleteOne);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);
    }

    getAll(req, res, next) {
        res.status(HttpStatus.OK);
        res.set('Content-Type', 'application/json');

        res.send(PLANETS);
    }

    getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;
        console.log(idPlanet);

        const planet = PLANETS.find(p => p.id == idPlanet);

        if(!planet) {
            // 2. La planete n'existe pas = 404 - Not found
            return next(HttpError.NotFound(`La planete avec le id ${idPlanet} n'existe pas.`));
        } else {
            // 1. La planete existe = 200 - OK
            res.status(200).json(planet); // fait Content-Type et Send la reponse
        }
    }

    post(req, res, next) {
        const newPlanet = req.body;

        const planet = PLANETS.find(p => p.id == newPlanet.id); 
        if(planet) {
            // J'ai un doublon === ERREUR
            return next(HttpError.Conflict(`Une planete avec l'identifiant ${newPlanet.id} existe déjà.`));
        } else {
            
            PLANETS.push(newPlanet);
            
            res.status(HttpStatus.CREATED); // 201
            res.json(newPlanet);

        }
    }

    deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;
        console.log(idPlanet);

        const index = PLANETS.findIndex(p => p.id == idPlanet);

        if(index == -1) {
            return next(HttpError.NotFound(`La planete avec le id ${idPlanet} n'existe pas.`));
        } else {
            PLANETS.splice(index, 1);
            res.status(HttpStatus.NO_CONTENT).end(); // 204
        }
    }

    patch(req, res, next) {
        return next(HttpError.NotImplemented()); // 501
    }

    put(req, res, next) {
        return next(HttpError.NotImplemented()); // 501
    }
}

// Super important, ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;