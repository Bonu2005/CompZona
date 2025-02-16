import { Router } from "express";
import { create, findAll, findBySearch, findOne, pegination, remove, update } from "../controllers/order.controller.js";
import middleWare from "../middleware/token.middleware.js";
import passedRole from "../middleware/rolePolice.js";
const orderRouter = Router()
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Barcha buyurtmalarni olish
 *     tags: [Orders]
 *     description: Barcha buyurtmalarni olish uchun so'rov
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Buyurtmalar ro'yxati
 *       401:
 *         description: Ruxsat etilmagan (Unauthorized)
 *       500:
 *         description: Ichki server xatosi (Internal Server Error)
 */
orderRouter.get("/", middleWare, findAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Maxsus buyurtmani olish
 *     tags: [Orders]
 *     description: Berilgan ID bo'yicha buyurtmani olish
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Buyurtma ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Buyurtma ma'lumotlari
 *       404:
 *         description: Buyurtma topilmadi
 *       401:
 *         description: Ruxsat etilmagan (Unauthorized)
 */

orderRouter.get("/:id", middleWare, findOne);


/**
 * @swagger
 * /orders/search:
 *   get:
 *     summary: Buyurtmalarni qidirish
 *     tags: [Orders]
 *     description: Buyurtmalarni qidirish uchun so'rov
 *     parameters:
 *       - name: query
 *         in: query
 *         description: Qidirilayotgan so'rov
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Qidirilgan buyurtmalar ro'yxati
 *       401:
 *         description: Ruxsat etilmagan (Unauthorized)
 */
orderRouter.get("/search", middleWare, findBySearch);

/**
 * @swagger
 * /orders/pagination/{page}/{take}:
 *   get:
 *     summary: Buyurtmalarni sahifalash
 *     tags: [Orders]
 *     description: Buyurtmalarni sahifalash (pagination) orqali olish
 *     parameters:
 *       - name: page
 *         in: path
 *         description: Sahifa raqami
 *         required: true
 *         schema:
 *           type: integer
 *       - name: take
 *         in: path
 *         description: Har bir sahifada nechta buyurtma ko'rsatiladi
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Sahifalangan buyurtmalar ro'yxati
 *       401:
 *         description: Ruxsat etilmagan (Unauthorized)
 */
orderRouter.get("/pagination/:page/:take", middleWare, pegination);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Buyurtma yaratish
 *     tags: [Orders]
 *     description: Yangi buyurtma yaratish uchun so'rov
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: order
 *         description: Yangi buyurtma ma'lumotlari
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: integer
 *               description: Buyurtma qilgan foydalanuvchining ID raqami
 *             total:
 *               type: number
 *               format: float
 *               description: Buyurtmaning jami narxi
 *             payment:
 *               type: string
 *               description: To'lov usuli (masalan, naqd, kartadan)
 *             status:
 *               type: string
 *               description: Buyurtmaning holati
 *           required:
 *             - userId
 *             - total
 *             - payment
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       201:
 *         description: Buyurtma muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 total:
 *                   type: number
 *                   format: float
 *                 payment:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Noto'g'ri so'rov yoki yetishmayotgan parametrlar
 *       500:
 *         description: Server xatosi
 */
orderRouter.post("/", middleWare, passedRole(["admin"]), create);

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Buyurtmani yangilash
 *     tags: [Orders]
 *     description: Buyurtmaning ma'lumotlarini yangilash. Faqat kerakli parametrlarni o'zgartirishingiz mumkin.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanishi kerak bo'lgan buyurtmaning ID raqami
 *         schema:
 *           type: integer
 *       - in: body
 *         name: order
 *         description: Yangilangan buyurtma ma'lumotlari
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             total:
 *               type: number
 *               format: float
 *               description: Buyurtmaning jami narxi
 *             payment:
 *               type: string
 *               description: To'lov usuli (masalan, naqd, kartadan)
 *             status:
 *               type: string
 *               description: Buyurtmaning holati (masalan, kutilyapti, bajarildi)
 *           required:
 *             - total
 *             - payment
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Buyurtma muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 total:
 *                   type: number
 *                   format: float
 *                 payment:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Noto'g'ri so'rov yoki yetishmayotgan parametrlar
 *       404:
 *         description: Buyurtma topilmadi
 *       500:
 *         description: Server xatosi
 */
orderRouter.patch("/:id", middleWare, passedRole(["admin"]), update);


/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Buyurtmani o'chirish
 *     tags: [Orders]
 *     description: Berilgan ID bo'yicha buyurtmani o'chirish
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Buyurtma ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Buyurtma muvaffaqiyatli o'chirildi
 *       404:
 *         description: Buyurtma topilmadi
 *       401:
 *         description: Ruxsat etilmagan (Unauthorized)
 */
orderRouter.delete("/:id", middleWare, passedRole(["admin"]), remove);

export default orderRouter