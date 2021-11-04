import mongoose from 'mongoose';

const explorationSchema = mongoose.Schema({

    explorationDate: { type: Date, default: Date.now, required:true },
    planet: { // Creation du lien entre exploration vers planet
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Planet',
        required:true
    },
    coord: {
        lon: Number,
        lat: Number
    },
    scans: [{
        element: String,
        percent: Number,
        _id:false
    }],
    commment: String,
    id:false
}, {
    collection: 'explorations'
});

export default mongoose.model('Exploration', explorationSchema);