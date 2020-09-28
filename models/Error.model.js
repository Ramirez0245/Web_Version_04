const mongoose = require('mongoose');

const ErrorLog = new mongoose.Schema
({
    FileName: { type: String, required: true},
    Extention: { type: String, required: true },
    Message: {type: String, requiredPaths: true},
    id: {type: String, required: true}
});

const File = mongoose.model('ErrorLog', ErrorLog);
module.exports = File;