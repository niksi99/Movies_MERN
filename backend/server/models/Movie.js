const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    DirectedBy: {
        type: String,
        required: true
    },
    WrittenBy: {
        type: String,
        required: true
    },
    ReleaseYear: {
        type: Number,
        required: true
    },
    Genre: {
        type: [String],
        required: true,
        default: []
    },
    Rating: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('Movie', MovieSchema)