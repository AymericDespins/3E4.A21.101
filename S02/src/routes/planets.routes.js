import express from 'express';
import HttpError from 'http-errors';
import httpStatus from 'http-status';

import PLANETS from '../data/planets.js'; // Possible de Import, car il y a un export dans le fichier planets.js

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        // Definition des routes pour la ressource Planet
        router.get('/planets', this.getAll);    // Retrieve toutes les planetes => "quand tu arrives sur /planets, fait getAll"
        router.get('/planets/:idPlanet', this.getOne);
        router.post('/planets', this.post);
    }

    getAll(req, res, next) {
        res.status(200);
        res.set('Content-Type', 'application/json');

        res.send(PLANETS);
    }

    getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;
        console.log(idPlanet);

        // 1. La planete existe = 200 - OK
        
        /* // Premiere facon
        let planet;
        for(let p of PLANETS) {
            if (p.id == idPlanet) {
                planet = p;
                break;
            }
        };
        */

        // 2e facon
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
        
    }
}

// Super important, ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;