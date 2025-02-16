import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const productModel = sequelize.define(
    "product",
    {
        compyuterNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            
        },
        charateristics: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)
export default productModel