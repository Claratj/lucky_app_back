const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    }
});

const New = mongoose.model('New', newSchema);

module.exports = New;