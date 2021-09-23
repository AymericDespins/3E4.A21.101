import express from 'express';
import httpError from 'http-errors';
import httpStatus from 'http-status';
import planetsRepository from '../repositories/planets.repository.js';

//-----------------------------------------------
// Importation du dossier
import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {

    constructor() {
        //Définition des routes pour la ressource planet
        router.get('/', this.getAll); //Retrieve toutes les planètes - Quand tu arrive sur /planets, tu use getAll()
        router.get('/:idPlanet', this.getOne);
        router.post('/', this.post);
        router.delete('/:idPlanet', this.deleteOne);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);
    }

    async getAll(req, res, next) {

        // Critères pour la BD
        const filter = {};
        if (req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }

        // Parametres de transformation
        const transformOptions = {};
        if(req.query.unit)
        {
            {
                const unit = req.query.unit;
                if (unit === 'c')
                {
                    transformOptions.unit = unit;
                }
                else
                {
                    return next(httpError.BadRequest("Le parametre unit doit avoir la valeur c pour Celcius")); // S'occupe des erreures
                }
            }
        }

        try {
            let planets = await planetsRepository.retrieveAll(filter); // Il faut utiliser let, car on veut faire des transformations et on pour pas le faire sur un const

            


            //Je veux un nouveau tableau des planètes transformées
            // Map = une boucle
            planets = planets.map(p => {
                p = p.toObject({getters:true, virtuals:false});
                p = planetsRepository.transform(p, transformOptions);
                return p;
            }); // Retourne un nouveau tableau selon les éléments voulu

            res.status(200).json(planets);
        }
        catch (err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        const transformOptions = {};
        if(req.query.unit)
        {
            {
                const unit = req.query.unit;
                if (unit === 'c')
                {
                    transformOptions.unit = unit;
                }
                else
                {
                    return next(httpError.BadRequest("Le parametre unit doit avoir la valeur c pour Celcius")); // S'occupe des erreures
                }
            }
        }

        try {
            let planet = await planetsRepository.retrieveById(idPlanet); // Il faut utiliser let, car on veut faire des transformations et on pour pas le faire sur un const

            //2. La planete existe pas 404
            if (!planet) {
                return next(HttpError.NotFound(`La planete avec le id ${idPlanet} n'existe pas.`));
            }
            //2. La planete existe 200
            else {

                planet = planet.toObject({getters:true, virtuals:false});
                planet = planetsRepository.transform(planet, transformOptions);
              
                res.status(200);
                res.json(planet); // Content-Type et send la reponse --- ex:(...planets) ... devant un tableau donne uniquement le premier element
            }

        }
        catch (err) {
            return next(err);
        }

    }



    async post(req, res, next) {
        const newPlanet = req.body;

        //TODO: Validation rapide jusqu'à la semaine +/- 8

        if(Object.keys(newPlanet).length === 0) {
            return next(httpError.BadRequest('La planète ne peut pas être vide'))
        }
        

        try {
                let planetAdded = await planetsRepository.create(newPlanet);
                planetAdded = planetAdded.toObject({getters:true, virtuals:false});
                planetAdded = planetsRepository.transform(planetAdded); // Pas d'option d'ajout

                res.status(201).json(planetAdded);             
        }
        catch(err)
        {
            return next(err);
        }

        //#region Old
        /*
        const planets = PLANETS.find(p => p.id == newPlanet.id)
        if (planets) {
            //J'ai un doublon === ERREUR
            return next(httpError.Conflict(`Une planete avec l'id ${newPlanet} existe déjà.`));
        }
        else {
            //C'est une nouvelle planette
            PLANETS.push(newPlanet);
            res.status(httpStatus.CREATED); //201
            res.json(newPlanet);
        }
        */
        //#endregion

    }

    async deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        try
        {
            const deleteResult = await planetsRepository.delete(idPlanet);

            if (!deleteResult) {
                // La planete existe pas            
                return next(HttpError.NotFound(`La planete avec le id ${idPlanet} n'existe pas.`));
            }
            else {
                //La planete existe           
    
    
                res.status(httpStatus.NO_CONTENT).end();
            }
        }
        catch{
            return next();
        }
        

        //#region old delete
        /*
        const index = PLANETS.findIndex(p => p.id == idPlanet) //Compare chaque élément du tableau
        if (index == -1) {
            // La planete existe pas            
            return next(HttpError.NotFound(`La planete avec le id ${idPlanet} n'existe pas.`));
        }
        else {
            //La planete existe
            PLANETS.splice(index, 1);
            res.status(httpStatus.NO_CONTENT).end();
        }
        */
        //#endregion
    }

    async patch(req, res, next) {
       
        const planetModifs = req.body;

        try{
            let planet = await planetsRepository.update(req.params.idPlanet, planetModifs);

            if(!planet) {
                return next(HttpError.NotFound(`La planète avec le id ${req.params.idPlanet} n'existe pas`));
            }

            planet = planet.toObject({getters: false, virtuals: false});
            planet = planetsRepository.transform(planet);

            res.status(200).json(planet);

        } catch(err) {
            return next(err);
        }
    }
    

    put(req, res, next) {
        return next(httpError.NotImplemented(`La fonction n'a pas été codée.`));
    }
}




// Super important de ne pas oublier ces deux lignes là
new PlanetsRoutes(); //On veut que le constructeur de PlanetsRoutes run au moins une fois pour le router
export default router;
