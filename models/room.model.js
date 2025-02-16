import { DataTypes, INTEGER } from "sequelize";
import sequelize from "../config/db.js";

const roomModel = sequelize.define(
    "room",
    {
        roomNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },  
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        charateristics: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            
        },
    }
)
export default roomModel