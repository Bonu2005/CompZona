import roomModel from "../models/room.model.js"
import { roomValidate } from "../validations/room.validation.js"
import { promises as fs}  from "fs"
async function findAll(req,res) {
    try {
        let findAll = await roomModel.findAll()
        res.json({message:findAll})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let findOne = await roomModel.findByPk(id)
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
        let find = await roomModel.findAll({where :query})
        res.status(200).json({message:find})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function create(req,res) {
    try {
        if(!req.file){
            return res.status(400).json({message:"No file uploded"})
        }
        let {filename}= req.file
        let {...data}=req.body
        let {error}=roomValidate({...data})
        if(error){
            await fs.unlink(`./uploads/${filename}`) 
            return res.status(400).json({message:error.details})
        }
        data.status="false"
         await roomModel.create({image:filename,...data})
        res.json({message:"Successfully created"})
    } catch (error) {
      
        res.status(400).json({message:error.message})
    }
}
async function update(req,res) {
    try {
        let {id}= req.params
        let data = req.body
        await roomModel.update(data,{where:{id}}) 
       res.json({message:"Successfully updated"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function remove(req,res) {
    try {
        let {id} = req.params
        let find = await roomModel.findOne({where:{id}})
       console.log(find);
       
        await roomModel.destroy({where:{id}})
        await fs.unlink(`./uploads/${find.dataValues.image}`) 
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


        let users = await roomModel.findAll({
            limit: takeNumber,
            offset: offset
        });


        res.json({ data: users });

    } catch (error) {

        res.status(400).json({ error: error.message });
    }
};
export {findAll,findOne,create,update,remove,findBySearch,pegination}