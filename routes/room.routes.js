import { Router } from "express";
import { create, findAll, findBySearch, findOne, pegination, remove, update } from "../controllers/room.controller.js";
import { upload } from "../multer/multer.js";
import middleWare from "../middleware/token.middleware.js";
import passedRole from "../middleware/rolePolice.js";

const roomRouter = Router()
/**
 * @swagger
 * /room:
 *   get:
 *     summary: Барча хоналарни олиш
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Барча хоналар рўйхати
 */
roomRouter.get("/",findAll)
/**
 * @swagger
 * /room/{id}:
 *   get:
 *     summary: ID бўйича хонадони олиш
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Хона ID рақами
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Хона ҳақида маълумот
 *       404:
 *         description: Хона топилмади
 */
roomRouter.get("/:id",findOne)
/**
 * @swagger
 * /room/search:
 *   get:
 *     summary: Хоналарни қидириш
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         required: false
 *         description: Хоналар учун қидириш параметри
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Қидиришга тўғри келган хоналар рўйхати
 *       400:
 *         description: Хатолик
 */
roomRouter.get("/search",findBySearch)
/**
 * @swagger
 * /room/pagination/{page}/{take}:
 *   get:
 *     summary: Хоналарни пагинация қилиш
 *     tags: [Rooms]
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
 *         description: Бетдаги хоналар сони
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Маълумотлар билан тўлдирилган бет
 *       400:
 *         description: Пагинация хато
 */
roomRouter.get("/pagination/:page/:take",middleWare,pegination)

/**
 * @swagger
 * /room:
 *   post:
 *     summary: Янги xona яратиш
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data: 
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Xona nomi
 *               description:
 *                 type: string
 *                 description: Xona haqida tavsif
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Xona narxi
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Xona rasmi (fayl)
 *     responses:
 *       201:
 *         description: Хона муваффақиятли яратилди
 *       400:
 *         description: Яратишда хатолик
 */
roomRouter.post("/", upload.single("image"), middleWare, passedRole(["admin"]), create);
/**
 * @swagger
 * /room/{id}:
 *   patch:
 *     summary: Хонани ID бўйича янгилаш (файл билан)
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Хона ID рақами
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Xona nomi
 *               description:
 *                 type: string
 *                 description: Xona haqida tavsif
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Xona narxi
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Xona rasmi (fayl)
 *     responses:
 *       200:
 *         description: Хона янгиланди
 *       404:
 *         description: Хона топилмади
 */
roomRouter.patch("/:id", upload.single("image"), middleWare, passedRole(["admin"]), update);
/**
 * @swagger
 * /room/{id}:
 *   delete:
 *     summary: Хонани ID бўйича ўчириш
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Хона ID рақами
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Хона ўчирилди
 *       404:
 *         description: Хона топилмади
 */
roomRouter.delete("/:id",middleWare,passedRole(["admin"]),remove)
export default roomRouter