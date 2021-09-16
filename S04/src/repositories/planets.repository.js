import Planet from '../models/planet.model.js';

class PlanetsRepository {
    retrieveById(id) {
        return Planet.findById(id);
    }

    retrieveAll(Filter) {
        // équivalent des WHERE en SQL
        const testFilter = {
            discoveredBy:'Skadex',
            temperature: {$gt: 240},
            'position.y':{$lt : 500}
        }
        //WHERE discoveredBy = 'Skadex' AND temperature > 240 AND position.y < 500;

        const testFilterOr = {
            $or:[{discoveredBy:'Skadex'}
                ,{temperature: {$gt : 240}}]
        }

        return Planet.find(Filter);
    }
}

export default new PlanetsRepository();