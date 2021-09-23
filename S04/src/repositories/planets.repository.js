import Planet from "../models/planet.model.js";
import ObjectToDotNotation from "../libs/objectToDotNotation.js"
import dayjs from "dayjs";

const ZERO_KELVIN = -273.15;

class PlanetsRepository {

    // Pour le GetOne
    retrieveById(idPlanet) {

        return Planet.findById(idPlanet);
    }

    // Pour le GetAll
    retrieveAll(filter) {

        //#region 
        /*
        //WHERE discoveredBy = "Skadex" AND temperature = 241
        const testFilter = {
            discoveredBy:"Skadex",
            temperature: {$gt:240},
            'position.y': {$lt:500}
        }
        

        //WHERE discoveredBy = "Skadex" OR temperature = 241
        const testFilterOr = {
            $or:[{discoveredBy:"Skadex",}
            , {temperature: {$gt:240}}]
        }
*/
        //#endregion
        return Planet.find(filter); //select * from *
    }


    create(planet){
        return Planet.create(planet); // Planet avec un P majuscule fait référence à la BD
    }

    delete(idPlanet)
    {
        return Planet.findByIdAndDelete(idPlanet);
    }

    update(idPlanet, planetModifs)
    {
        const planetToDotNotation = ObjectToDotNotation(planetModifs);
        return Planet.findByIdAndUpdate(idPlanet, planetToDotNotation, {new:true});
    }

    // Pour la transformatio ne c en k
    transform(planet, transformOptions = {}){

        if(transformOptions.unit)
        {
            switch(transformOptions.unit){
                case 'c':
                    planet.temperature += ZERO_KELVIN;

                    planet.temperature = parseFloat(planet.temperature.toFixed(2));
                    break;
            }           
        }

        planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD');

        //HexMatrix => parseInt

        //0x8B
        planet.lightspeed = `${planet.position.x.toString(16)}@${planet.position.y.toString(16)}#${planet.position.z.toString(16)}`;

        delete planet.__v;

        return planet; 
    }
}



export default new PlanetsRepository();