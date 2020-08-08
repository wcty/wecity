const {Schema, model} = require('mongoose');

const properties = new Schema({
    Name: String,
    Description: String,
    Cover: String,
})

const marker = new Schema({
    type:{
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true,
        unique: true
    },
    properties: {
        type: properties,
    }
})

module.exports = model("markers", marker)