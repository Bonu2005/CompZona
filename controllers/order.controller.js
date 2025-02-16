import orderModel from "../models/order.model.js"
import orderItemModel from "../models/orderItem.model.js"
import roomModel from "../models/room.model.js"
import userModel from "../models/user.model.js"
import { orderValidate } from "../validations/order.validation.js";

async function findAll(req, res) {
    try {
        let findAll = await orderModel.findAll({
            include: [
                { model: userModel },  
                { 
                    model: orderItemModel,  
                    include: [
                        { model: roomModel }  
                    ]
                }
            ]
        });

        res.json({ message: findAll });
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let findOne = await orderModel.findByPk(id,{include:{model:userModel}})
        res.json({message:findOne})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function findBySearch(req,res) {
    try {
        let query = req.query
        console.log(query);
        
        if(Object.keys(query).length === 0){
            return res.json({message:"Query is required"})
        }
        let find = await orderModel.findAll({where :query,include:{model:orderModel}})
        res.status(200).json({message:find})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function create(req,res) {
    try {
      
      let { products, ...data } = req.body;
      let {error}=orderValidate({...data})
      if(error){
        return res.status(400).json({message:error.details})
      }
      data.status="panding"
      let created = await orderModel.create(data);

      if (!products.length) {
         return res.status(422).json({ message: "Products cannot be empty" });
      }
      console.log(products);
 
     await orderItemModel.bulkCreate(
         products.map((oi) => ({ orderId: created.id , ...oi}))
      );
     
      res.status(201).json({ data: created });
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function update(req,res) {
    try {
        let {id}= req.params
        let data = req.body
        await orderModel.update(data,{where:{id}}) 
       res.json({message:"successfully updated"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function remove(req,res) {
    try {
        let {id} = req.params
        await orderModel.destroy({where:{id}})
        res.json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function pegination(req, res) {
    try {
        let { page, take } = req.query;


        let pageNumber = parseInt(page, 10) || 1;
        let takeNumber = parseInt(take, 10) || 10;

        let offset = (pageNumber - 1) * takeNumber;


        let users = await orderModel.findAll({
            limit: takeNumber,
            offset: offset
        });


        res.json({ data: users });

    } catch (error) {

        res.status(400).json({ error: error.message });
    }
};
export {findAll,findOne,create,update,remove,findBySearch,pegination}