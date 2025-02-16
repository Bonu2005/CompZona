import { config } from "dotenv"
config()
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import otp from "otplib"
import jwt from "jsonwebtoken"
import { transport } from "../config/nodemailer.js"
import { userValidate } from "../validations/user.validation.js"
import { loginValidate } from "../validations/login.validation.js"
import { Op } from "sequelize"
otp.totp.options = { step: 600, digits: 5 };
async function findAll(req, res) {
    try {
        let findAll = await userModel.findAll()
        res.json({ message: findAll })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function findOne(req, res) {
    try {
        let { id } = req.params
        let findOne = await userModel.findByPk(id)
        res.json({ message: findOne })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function findBySearch(req, res) {
    try {
        let { searchTerm } = req.query;
        
       
        if (!searchTerm) {
            return res.status(400).json({ message: "Query is required" });
        }

        let find = await userModel.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${searchTerm}%` } },
                    { email: { [Op.like]: `%${searchTerm}%` } }
                ]
            }
        });

        
        if (find.length > 0) {
            return res.status(200).json({ message: find });
        } else {
            return res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

async function sendEmail(req, res) {
    try {
        let { email } = req.body
        console.log(email);
        let otp1 = otp.totp.generate(process.env.OTP_SECRET + email);
        await transport.sendMail({
            from: "booonu@icloud.com",
            to: email,
            subject: "One time password",
            text: `Code for verify account ${otp1}`,
        });

        res.json({ message: "Verify code is sended" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
async function verify(req, res) {
    try {
        let { otp1, email } = req.params
        console.log(email, otp1);
        let check = otp.totp.check(otp1, process.env.OTP_SECRET + email)
        console.log(check);
        if (!check) {
            return res.status(401).json({ message: "Wrong one time password" })
        }
        res.status(201).json({ message: "Goood now you can go to the registr page" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
async function registr(req, res) {
    try {
        let { name, email, password } = req.body
        let { error } = userValidate({ name, email, password })
        if (error) {
            return res.status(400).json({ message: error.details })
        }


        let cheek = await userModel.findOne({ where: { email } })

        if (cheek) {
            return res.status(400).json("Already have an accaunt")
        }
        let hash = bcrypt.hashSync(password, 10)
        await userModel.create({ name, email, password: hash, role: "user" })
        let find = await userModel.findOne({ where: { email } })
        

        let token = jwt.sign({
            id: find.dataValues.id, role: find.dataValues.role
        }, process.env.TOKEN_SECRET)
        res.json({ your_token: token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function update(req, res) {
    try {
        let { id } = req.params
        let data = req.body
        await userModel.update(data, { where: { id } })
        res.json({ message: "successfully updated" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function remove(req, res) {
    try {
        let { id } = req.params
        await userModel.destroy({ where: { id } })
        res.json({ message: "Successfully removed" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function login(req, res) {
    let { email, password } = req.body
    let { value, error } = loginValidate({ email, password })
    if (error) {
        res.status(400).json({ message: error.message })
        return
    }
    let cheek = await userModel.findOne({ where:{email:email} })
    if (!cheek) {
        res.status(404).json({ message: "Not found user" })
        return
    }
    let cheekPassword =(password===cheek.dataValues.password)
    if (!cheekPassword) {
        res.status(400).json({ message: "Wrong creadentials" })
        return
    }
   

    let token = jwt.sign({
        id: cheek.dataValues.id, role: cheek.dataValues.role
    }, process.env.TOKEN_SECRET)
    res.json({ your_token: token })
}
async function pegination(req, res) {
    try {
        let { page, take } = req.query;


        let pageNumber = parseInt(page, 10) || 1;
        let takeNumber = parseInt(take, 10) || 10;

        let offset = (pageNumber - 1) * takeNumber;


        let users = await userModel.findAll({
            limit: takeNumber,
            offset: offset
        });


        res.json({ data: users });

    } catch (error) {

        res.status(400).json({ error: error.message });
    }
};
async function createAdmin(req, res) {
    try {
        let { email, name, password } = req.body
        let { value, error } = userValidate({ email, name, password })
        if (error) {
            return res.status(401).json({ error: error.message })
        }
        const users = await userModel.findAll({
            where: { email: email }  
        });
        if (users.length) {
            return res.status(201).json({ message: "Admin already registered" })
        }
        let hash = bcrypt.hashSync(password, 10)
        let user = await userModel.create({ email, name, password: hash, role: "admin" })
        let token = jwt.sign({
            id: user.dataValues.id, role: user.dataValues.role
        }, process.env.TOKEN_SECRET)
        res.json({ your_token: token })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export { findAll, findOne, registr, update, remove, findBySearch, sendEmail, verify, login, pegination, createAdmin }