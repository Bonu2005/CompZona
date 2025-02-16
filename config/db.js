import { Sequelize } from "sequelize";

const sequelize= new Sequelize({
    username:"root",
    host:"localhost",
    password:"bonu2005",
    database:"comp",
    dialect:"mysql",
    logging:false
})

export default sequelize