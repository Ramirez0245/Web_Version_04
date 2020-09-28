const File_model = require('../../models/File.model');
const Validation = require('../../validation');

const search_File = async (req, res, next) =>
{
    const { error } = Validation.FileValidation(req);
    if (error)
    {
        const comment = [ {status: error.details[0].message} ]
        res.status(400).send(comment)
    }

    const sendingExample = {FileName: req.body.file_name, Extention: req.body.extention};
    const search = await File_model.find( sendingExample ); 

    if(search.length == 0)
    {
        return res.status(404).send('That file with that extention does not exist');
    }
    console.log("???? 3");
    console.log('search_File_demo ended');
    res.status(200).send('File Exist');
}
const get_all = async (req, res, next) =>
{
    const search = await File_model.find({}, {FileName: 1, Extention: 1});
    console.log(search);
    res.status(200).send(search);
}

exports.search_File = search_File;
exports.get_all = get_all;

