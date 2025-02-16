import productModel from "../models/product.model.js"
import { productValidate } from "../validations/product.validation.js"
import { promises as fs}  from "fs"
async function findAll(req,res) {
    try {
        let findAll = await productModel.findAll()
        res.json({message:findAll})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let findOne = await productModel.findByPk(id)
        res.json({message:findOne})
    } catch (error) {
        res.status(400).json({message:error})
    }
}
async function findBySearch(req,res) {
    try {
        let query = req.query
        console.log(query);
        
        if(Object.keys(query).length === 0){
            return res.json({message:"Query is required"})
        }
        let find = await productModel.findAll({where :query})
        res.status(200).json({message:find})
    } catch (error) {
        res.status(400).json({message:error})
    }
}
async function create(req,res) {
    try {
       if(!req.file){
        return res.status(400).json({message:"No file uploded"})
       }
       let {filename}=req.file
        let {...data}=req.body
        let {error}=productValidate({...data})
        if(error){
             await fs.unlink(`./uploads/${filename}`) 
            return res.status(400).json({message:error.details})
        }
        data.status="false"
        await productModel.create({image:filename,...data})
        res.json({message:"Successfully created"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function update(req,res) {
    try {
        let {id}= req.params
        let data = req.body
        await productModel.update(data,{where:{id}}) 
        res.json({message:"successfully updated"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function remove(req,res) {
    try {
        let {id} = req.params
        let find = await productModel.findOne({where:{id}})
       console.log(find);
       
        await productModel.destroy({where:{id}})
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


        let users = await productModel.findAll({
            limit: takeNumber,
            offset: offset
        });


        res.json({ data: users });

    } catch (error) {

        res.status(400).json({ error: error.message });
    }
};
export {findAll,findOne,create,update,remove,findBySearch,pegination}