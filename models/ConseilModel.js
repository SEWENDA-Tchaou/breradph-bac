import { Sequelize } from "sequelize";
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

