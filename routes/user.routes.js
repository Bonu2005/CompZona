import { Router } from "express";
import { 
  createAdmin, 
  findAll, 
  findBySearch, 
  findOne, 
  login, 
  pegination, 
  registr, 
  remove, 
  sendEmail, 
  update, 
  verify 
} from "../controllers/user.controller.js";
import selfPolice from "../middleware/selfPolice.js";
import middleWare from "../middleware/token.middleware.js";
import passedRole from "../middleware/rolePolice.js";

const userRouter = Router();

/**
 * @swagger
 * /user/search:
 *   get:
 *     summary: Фойдаланувчиларни қидириш
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         description: Фойдаланувчилар учун қидириш параметри
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Қидиришга тўғри келган фойдаланувчилар рўйхати
 *       400:
 *         description: Хатолик
 */
userRouter.get("/search", findBySearch);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Барча фойдаланувчиларни олиш
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Барча фойдаланувчилар рўйхати
 */
userRouter.get("/", middleWare, passedRole(["admin"]), findAll);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: ID бўйича фойдаланувчини олиш
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Фойдаланувчи ID рақами
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Фойдаланувчи ҳақида маълумот
 *       404:
 *         description: Фойдаланувчи топилмади
 */
userRouter.get("/:id", middleWare, passedRole(["admin"]), findOne);

/**
 * @swagger
 * /user/pagination/{page}/{take}:
 *   get:
 *     summary: Фойдаланувчиларни пагинация қилиш
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         description: Бет рақами
 *         schema:
 *           type: integer
 *       - in: path
 *         name: take
 *         required: true
 *         description: Бетдаги фойдаланувчилар сони
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Маълумотлар билан тўлдирилган бет
 *       400:
 *         description: Пагинация хато
 */
userRouter.get("/pagination/:page/:take", middleWare, pegination);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Янги фойдаланувчи рўйхатдан ўтказиш
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Фойдаланувчи муваффақиятли рўйхатдан ўтказилди
 *       400:
 *         description: Яратишда хатолик
 */
userRouter.post("/", registr);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Фойдаланувчини кириш
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Фойдаланувчи муваффақиятли кирди
 *       400:
 *         description: Хатолик
 */
userRouter.post("/login", login);

/**
 * @swagger
 * /user/adminCreate:
 *   post:
 *     summary: Администраторни яратиш
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Администратор муваффақиятли яратилди
 *       400:
 *         description: Яратишда хатолик
 */
userRouter.post("/adminCreate", middleWare, passedRole(["admin"]), createAdmin);

/**
 * @swagger
 * /user/send-email:
 *   post:
 *     summary: Почта юбориш
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Почта муваффақиятли юборилди
 *       400:
 *         description: Хатолик
 */
userRouter.post("/send-email", sendEmail);

/**
 * @swagger
 * /user/verify/{otp1}/{email}:
 *   get:
 *     summary: Электрон почтани тасдиқлаш
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: otp1
 *         required: true
 *         description: OTP коди
 *         schema:
 *           type: string
 *       - in: path
 *         name: email
 *         required: true
 *         description: Электрон почта
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Почта тасдиқланди
 *       404:
 *         description: Хато ёки ёлғон OTP
 */
userRouter.get("/verify/:otp1/:email", verify);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Фойдаланувчини янгилаш
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Фойдаланувчи ID рақами
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Фойдаланувчи янгиланди
 *       404:
 *         description: Фойдаланувчи топилмади
 */
userRouter.patch("/:id", middleWare, selfPolice(["user", "admin"]), update);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Фойдаланувчини ўчириш
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Фойдаланувчи ID рақами
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Фойдаланувчи ўчирилди
 *       404:
 *         description: Фойдаланувчи топилмади
 */
userRouter.delete("/:id", middleWare, selfPolice(["user", "admin"]), remove);

export default userRouter;
