const mongoose = require('mongoose')

const roastingSchema = mongoose.Schema({
    brightness: {
        type: String,
        required: true
    },
    agtron_no: {
        type: Number,
        required: true
    },
    characteristic: {
        type: String,
    },
    hue: {
        type: Number
    },
    saturation: {
        type: Number
    },
    value: {
        type: Number
    }
})

module.exports = mongoose.model('Roasting', roastingSchema)