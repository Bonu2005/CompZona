import { Router } from "express";
import userRouter from "./user.routes.js";
import orderRouter from "./order.routes.js";
import productRouter from "./product.routes.js";
import roomRouter from "./room.routes.js";

const mainRouter = Router()

mainRouter.use("/user",userRouter)
mainRouter.use("/order",orderRouter)
mainRouter.use("/product",productRouter)
mainRouter.use("/room",roomRouter)
export default mainRouter   