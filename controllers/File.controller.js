const File_Model = require('../models/File.model');
const Error_Log = require('../models/Error.model');
const Validation  = require('../validation.js');

//File Page
const File_get_all  =  (req, res, next) =>
{
    res.render('File_view');
};

//POST
const File_post = async (req, res, next) =>
{
    //VALIDATE INPUT
    const { error } = Validation.FileValidation(req); 
    if (error)
    {
        const msgPlus = "Rendered status: " + error.details[0].message;
        const comment = [ {status: msgPlus} ]
        return res.render('File_view', { comment }); 
    } 
    //GRAB FILE OR FILES
    const search = await File_Model.find( {FileName: req.body.file_name, Extention: req.body.extention} );

    //CHECK IF FILE WITH EXTENTION EXIST
    if( search.length == 1) 
    { 
        const comment = [ {status: 'Rendered status: File with that extention already exist'} ]
        return res.render('File_view', { comment }); 
    }

    //ADD FILE TO DATABASE
    if ( search.length == 0 )
    {
        const File = await new File_Model({FileName: req.body.file_name, Extention: req.body.extention});
        await File.save();
        const comment = [{status: 'Rendered status: File with that extention has been created.'}];
        return res.render('File_view',  { comment }  );
    }

    //IF MULITIPLE/EXCESS FILE AND REMOVE.
    if( search.length > 0 )
    {
        for(i = 1; i > search.length; i++)
        {
            const error_properties = {FileName: search[i].FileName, Extention: search[i].Extention, Message: "Mulitple File", id: search[i].id};
            const Error = await new Error_Log(error_properties);
            await Error.save();
            await File_Model.findByIdAndRemove(search[i].id);
        }
        const comment = [{status: 'File with that extention already exist'}];
        return res.render('File_view',  { comment }  );
    } 
}

//DELETE
const File_Delete = async (req, res, next) =>
{
    //VALIDATE INPUT
    const { error } = Validation.FileValidation(req);
    if (error)
    {
        const comment = [ {status: error.details[0].message} ]
        return res.status(400).send(comment)
    } 
    //GRAB FILE OR FILES
    const search = await File_Model.find( {FileName: req.body.file_name, Extention: req.body.extention} );

    //IF EMPTY
    if ( search.length == 0 ) { return res.status(404).send('That file with that extention does not exist'); }



    //DELETE FILE OR HANDLE DUPLICATE FILE
    if( search.length > 0)
    {
        if(search.length == 1)
        {
            await File_Model.findByIdAndUpdate(search[0].id);
            return res.status(200).send('File has been deleted');
        }
        for(i = 1; i < search.length; i++)
        {
            const error_properties = {FileName: search[i].FileName, Extention: search[i].Extention, Message: "Mulitple File", id: search[i].id};
            const Error = await new Error_Log(error_properties);
            await Error.save();
            await File_Model.findByIdAndRemove(search[i].id);
        }
        await File_Model.findByIdAndRemove(search[0].id);
        return res.status(200).send('File has been deleted');
    }
}

const File_Patch = async (req, res, next) =>
{
    //VALIDATE INPUT
    const { error } = Validation.FileValidationPatch(req);
    if (error)
    {
        const comment = [ {status: error.details[0].message} ]
        return res.status(400).send(comment)
    }

    //GRAB FILE OR FILES
    const search = await File_Model.find( {FileName: req.body.file_name, Extention: req.body.extention} );
    const duplicateCheck = await File_Model.find( {FileName: req.body.file_name_to, Extention: req.body.extention_to} );
    if (duplicateCheck.length > 0)
    {
        return res.status(403).send('A file with that extention already exist. Cannot add a duplicate file');
    }
    //IF EMPTY
    if ( search.length == 0 ) { return res.status(404).send('That file with that extention does not exist'); }

    //PATCH AND HANDLE MULITPLE FILES
    if( search.length > 0) 
    { 
        if(search.length == 1) 
        {
            await File_Model.findByIdAndUpdate(search[0].id, {FileName: req.body.file_name_to, Extention: req.body.extention_to});
            return res.status(200).send('File has been renamed/updated');
        }
        for(i = 1; 1 < search.length; i++)
        {
            const error_properties = {FileName: search[i].FileName, Extention: search[i].Extention, Message: "Mulitple File", id: search[i].id};
            const Error = await new Error_Log(error_properties);
            await Error.save();
            await File_Model.findByIdAndRemove(search[i].id);
        }
        await File_Model.findByIdAndRemove(search[0].id);
        return res.status(200).send('File has been renamed/updated');
    }
}



exports.File_Delete = File_Delete;
exports.File_Patch = File_Patch;
exports.File_get_all = File_get_all;
exports.File_post = File_post;