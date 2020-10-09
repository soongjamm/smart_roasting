const mongoose = require('mongoose')

const beanSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    origin: {
        type: String
    },
    roasting_level: {
        type: mongoose.Schema.Types.ObjectId
    },
    desc: {
        type: String
    },
    aroma: {
        type: Number
    },
    acidity: {
        type: Number
    },
    sweetness: {
        type: Number
    },
    bitterness: {
        type: Number
    },
    body: {
        type: Number
    },

})

module.exports = mongoose.model('Bean', beanSchema);