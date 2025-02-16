import express from "express"
import { config } from "dotenv"
import sequelize from "./config/db.js"
import mainRouter from "./routes/index.js"
import { specs } from "./config/swagger.js"
import swaggerUi from "swagger-ui-express";
config()
const app = express()
app.use(express.json())

app.use("/",mainRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

async function connectDb() {
    try {
        await sequelize.sync()
        console.log("connect db");
      
        app.listen(process.env.PORT,()=>{
            console.log("server is run on PORT",process.env.PORT);
        })
    } catch (error) {
        console.log(error);
    }
}

connectDb()
