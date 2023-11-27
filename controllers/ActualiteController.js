// import Crud from "../models/ActualiteModel.js";
import path from 'path';
import fs from 'fs';
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Crud = db.define('actualites', {
    image: {
        type: DataTypes.STRING
    },
    titre: {
        type: DataTypes.STRING
    },
    theme: {
        type: DataTypes.STRING
    },
    themeTout: {
        type: DataTypes.STRING
    },
    url:{ 
        type: DataTypes.STRING
    }

});

export default Crud;

(async() => {
    await db.sync();
}) ();


export const getContents = async(req, res) => {
   try {
        const response = await Crud.findAll();
        //console.log()
        res.json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const getContentById = async(req, res) => {
    try {
        const response = await Crud.findOne({
            where:{
                id: req.params.id
            }
        });
        res.set({
            "Access-Control-Allow-Origin": "http://https://brera-fin-back.vercel.app",
            // "Access-Control-Allow-Credentials": true,
        }).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const saveContent = (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "Le fichier n'est pas charger"});
    try{
        // texte, theme1, lireTout1 sont des values dans les inputs du form
    const titre = req.body.texte;
    const theme = req.body.theme1;
    const themeTout = req.body.lireTout1;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Le format de l'image n'est valide!"});
    if(fileSize > 5000000) return res.status(422).json({msg: "L'image doit avoir une capacite inferieur a 5MB"});
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        console.error("Erreur lors du déplacement du fichier :", err);
        try {
            await Crud.create({titre: titre, theme: theme, themeTout: themeTout, image: fileName, url: url});
            res.status(201).json({msg: "Votre contenu a été crée avec succès "})
        }catch (error){
            console.log(error.message);
        }
    })
    }catch(error){
        console.error("Erreur lors de la création d'une actualité :", error);
        return res.status(500).json({ msg: "Erreur de serveur lors de la création d'une actualité." });
    }
}

export const updateContent = async(req, res) => {
    const contenu = await Crud.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!contenu) return res.status(404).json({msg: "Il n'y a aucune donnée"});
    let fileName = "";
    if(req.files === null) {
        fileName = Crud.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Le format de l'image n'est valide!"});
        if(fileSize > 5000000) return res.status(422).json({msg: "L'image doit avoir une capacite inferieur a 5MB"});

        const filepath = `./public/images/${contenu.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const titre = req.body.texte;
    const theme = req.body.theme1;
    const themeTout = req.body.lireTout1;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try{
        await Crud.update({titre: titre, theme: theme, themeTout: themeTout, image: fileName, url: url}, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Contenu mis a jour avec succès"})
    } catch(error) {
        console.log(error.message)
    }
}

export const deleteContent = async(req, res)=>{
    const contenu = await Crud.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!contenu)
    {
        return res.status(404).json({msg: "Il n'y a aucune donnée"});
    }
    try{
        const filepath = `./public/images/${contenu.image}`;
        fs.unlinkSync(filepath);
        // app.options('/contents/:id', cors());
        await Crud.destroy({
                where:{
                    id: req.params.id
                }
            });
            res.status(200).json({msg: "Centenu supprimer avec succès"})
        }catch(error){
            console.log(error.message);
        }
}
