import { Router } from "express";
import { create, findAll, findBySearch, findOne, pegination, remove, update } from "../controllers/product.controller.js";
import { upload } from "../multer/multer.js";
import middleWare from "../middleware/token.middleware.js";
import passedRole from "../middleware/rolePolice.js";
const productRouter = Router()
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Barcha mahsulotlarni olish
 *     tags: [Products]
 *     description: Barcha mahsulotlarni olish uchun so'rov
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Mahsulotlar ro'yxati
 *       401:
 *         description: Ruxsat etilmagan (Unauthorized)
 *       500:
 *         description: Ichki server xatosi (Internal Server Error)
 */
productRouter.get("/", findAll);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Maxsus mahsulotni olish
 *     tags: [Products]
 *     description: Berilgan ID bo'yicha mahsulotni olish
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Mahsulot ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Mahsulot ma'lumotlari
 *       404:
 *         description: Mahsulot topilmadi
 *       401:
 *         description: Ruxsat etilmagan (Unauthorized)
 */
productRouter.get("/:id", findOne);

/**
 * @swagger
 * /product/search:
 *   get:
 *     summary: Mahsulotlarni qidirish
 *     tags: [Products]
 *     description: Mahsulotlarni nomiga yoki boshqa xususiyatlariga qarab qidirish
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Qidirish natijalari
 *       400:
 *         description: Xato so'rov
 */
productRouter.get("/search", findBySearch);

/**
 * @swagger
 * /product/pagination/{page}/{take}:
 *   get:
 *     summary: Mahsulotlar ro'yxatini sahifalash
 *     tags: [Products]
 *     description: Mahsulotlarni sahifalar orqali olish
 *     parameters:
 *       - name: page
 *         in: path
 *         description: Sahifa raqami
 *         required: true
 *         schema:
 *           type: integer
 *       - name: take
 *         in: path
 *         description: Mahsulotlar soni
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Mahsulotlar ro'yxati
 *       404:
 *         description: Sahifa topilmadi
 */
productRouter.get("/pagination/:page/:take", middleWare, pegination);
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Yangi mahsulot yaratish
 *     tags: [Products]
 *     description: Yangi mahsulotni ma'lumotlari bilan bazaga qo'shish. Rasm va boshqa parametrlar kiritilishi kerak.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: compyuterNumber
 *         description: Mahsulotning kompyuter raqami
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: price
 *         description: Mahsulotning narxi
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *       - in: formData
 *         name: type
 *         description: Mahsulot turi (kompyuter, aksessuar va h.k.)
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: image
 *         description: Mahsulotning rasmi
 *         required: true
 *         type: file
 *       - in: formData
 *         name: status
 *         description: Mahsulotning holati (masalan, yangi, foydalanilgan)
 *         required: false
 *         schema:
 *           type: string
 *       - in: formData
 *         name: charateristics
 *         description: Mahsulotning xarakteristikasi (misol uchun, protsessor tezligi, xotira hajmi)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Mahsulot muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Yaratilgan mahsulotning ID raqami
 *                 compyuterNumber:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 type:
 *                   type: string
 *                 image:
 *                   type: string
 *                 status:
 *                   type: string
 *                 charateristics:
 *                   type: string
 *       400:
 *         description: Noto'g'ri so'rov yoki yetishmayotgan parametrlar
 *       500:
 *         description: Server xatosi
 *     security:
 *       - bearerAuth: []
 */
productRouter.post("/", upload.single("image"), middleWare, passedRole(["admin"]), create);
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Mahsulotni yangilash
 *     tags: [Products]
 *     description: Mahsulotni yangilash uchun barcha ma'lumotlarni yuborishingiz mumkin (rasm, narx, status va h.k.).
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanishi kerak bo'lgan mahsulotning ID raqami
 *         schema:
 *           type: integer
 *       - in: formData
 *         name: compyuterNumber
 *         description: Mahsulotning kompyuter raqami
 *         required: false
 *         schema:
 *           type: string
 *       - in: formData
 *         name: price
 *         description: Mahsulotning narxi
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *       - in: formData
 *         name: type
 *         description: Mahsulot turi
 *         required: false
 *         schema:
 *           type: string
 *       - in: formData
 *         name: image
 *         description: Mahsulotning yangi rasmi
 *         required: false
 *         type: file
 *       - in: formData
 *         name: status
 *         description: Mahsulotning holati
 *         required: false
 *         schema:
 *           type: string
 *       - in: formData
 *         name: charateristics
 *         description: Mahsulot xarakteristikasi
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mahsulot muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 compyuterNumber:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 type:
 *                   type: string
 *                 image:
 *                   type: string
 *                 status:
 *                   type: string
 *                 charateristics:
 *                   type: string
 *       400:
 *         description: Noto'g'ri ma'lumot yoki so'rov
 *       404:
 *         description: Mahsulot topilmadi
 *       500:
 *         description: Server xatosi
 *     security:
 *       - bearerAuth: []
 */
productRouter.patch("/:id", upload.single("image"), middleWare, passedRole(["admin"]), update);


/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Mahsulotni o'chirish
 *     tags: [Products]
 *     description: Berilgan ID bo'yicha mahsulotni o'chirish
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Mahsulot ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Mahsulot o'chirildi
 *       404:
 *         description: Mahsulot topilmadi
 *       401:
 *         description: Ruxsat etilmagan (Unauthorized)
 */
productRouter.delete("/:id", middleWare, passedRole(["admin"]), remove);

export default productRouter