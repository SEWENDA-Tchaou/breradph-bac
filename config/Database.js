import { Sequelize } from "sequelize";

const db = new Sequelize ('crud_react', 'root', '', {
    host:'localhost',
    dialect:'mysql'
});

export default db;
// module.exports = db;
