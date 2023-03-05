const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    codeSnippet: {type: String},
    title: {type: String},
    poster: {type: String},
    comments: {type: Array}

});

module.exports = mongoose.model("posts", postSchema); 