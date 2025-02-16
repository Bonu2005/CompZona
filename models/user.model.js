import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const userModel = sequelize.define(
    "user",
    {
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
     
    }
)
export default userModel