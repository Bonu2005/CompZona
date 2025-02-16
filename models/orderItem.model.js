import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import productModel from "./product.model.js";
import orderModel from "./order.model.js";
import roomModel from "./room.model.js";


const orderItemModel = sequelize.define(
    "orderItem",
    {
        productId: {
            type: DataTypes.INTEGER,
            references:{
              model:productModel,
              key:"id"
            },
            allowNull: false
        },
        orderId: {
            type: DataTypes.INTEGER,
            references:{
             model:orderModel,
             key:"id"
            },
            allowNull: false
        },
     
        start: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false
        },
        vip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summa: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        roomId: {
            type: DataTypes.INTEGER,
             references:{
               model:roomModel,
               key:"id"
             },
            allowNull: false
        },
    }
)
productModel.belongsToMany(orderModel,{through:orderItemModel,foreignKey:"productId",otherKey:"orderId",onDelete:"CASCADE"})
orderModel.belongsToMany(productModel,{through:orderItemModel,foreignKey:"orderId",otherKey:"productId",onDelete:"CASCADE"})
orderModel.hasMany(orderItemModel, { foreignKey: "orderId",onDelete:"CASCADE" });
orderItemModel.belongsTo(orderModel, { foreignKey: "orderId",onDelete:"CASCADE" });
orderItemModel.belongsTo(roomModel, { foreignKey: 'roomId',onDelete:"CASCADE" });
export default orderItemModel
