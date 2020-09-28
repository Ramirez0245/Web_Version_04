const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema
({
    FileName: { type: String, required: true, min: 4, max: 26 },
    Extention: { type: String, required: true, min: 1, max: 12 }
});

const File = mongoose.model('File', FileSchema);
module.exports = File;