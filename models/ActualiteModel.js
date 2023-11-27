import { Sequelize } from "sequelize";
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
