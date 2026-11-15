import { createTransport } from 'nodemailer'
import { envConfig } from './env.config.js';


const sendMail = async ({ email, subject, html }) => {
    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: envConfig.SMTP_USER,
            pass: envConfig.SMTP_PASSWORD,
        },
    });

    await transport.sendMail({
        from: envConfig.SMTP_USER,
        to: email,
        subject,
        html,
    })
}

export default sendMail;