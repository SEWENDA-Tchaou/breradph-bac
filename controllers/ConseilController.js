// import Crud from "../models/ConseilModel.js";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Crud = db.define('crudconseils', {
    titre: {
        type: DataTypes.STRING
    },
    conseil1: {
        type: DataTypes.STRING
    },
    conseil2: {
        type: DataTypes.STRING
    },
    conseil3:{ 
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
    const titre = req.body.titre;
    const conseil1 = req.body.conseil1;
    const conseil2 = req.body.conseil2;
    const conseil3 = req.body.conseil3;
        try {
             Crud.create({titre: titre, conseil1: conseil1, conseil2: conseil2, conseil3: conseil3});
            res.status(201).json({msg: "Votre contenu a été crée avec succès "})
        }catch (error){
            console.log(error.message);
        }
    }


export const updateContent = async(req, res) => {
    const contenu = await Crud.findOne({
        where:{
            id: req.params.id
        }
    });
 
    if(!contenu)
    {
        return res.status(404).json({msg: "Il n'y a aucune donnée"});
    }
    const titre = req.body.titre;
    const conseil1 = req.body.conseil1;
    const conseil2 = req.body.conseil2;
    const conseil3 = req.body.conseil3;

    try{
        await Crud.update({titre: titre, conseil1: conseil1, conseil2: conseil2, conseil3: conseil3}, {
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
    try{
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
