import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import userModel from "./user.model.js";
const orderModel = sequelize.define(
    "order",
    {
        userId: {
            type: DataTypes.INTEGER,
             references:{
               model:userModel,
               key:"id"
             },
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        payment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            
        },
      
    }
)
orderModel.belongsTo(userModel,{foreignKey:"userId",onDelete:"CASCADE"})
userModel.hasMany(orderModel,{foreignKey:"userId",onDelete:"CASCADE"})
export default orderModel