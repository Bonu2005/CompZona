import nodemailer from "nodemailer"

export const transport = nodemailer.createTransport({
    service: "icloud",
    auth: {
       user: "booonu@icloud.com",
       pass: "ghbw-kknw-hbqr-srzv",
    },
 })