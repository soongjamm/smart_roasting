const mongoose = require('mongoose');

// Define Schemes
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    // 댓글 추가
    // comment: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
}, {
    // Options
    timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('Post', postSchema);