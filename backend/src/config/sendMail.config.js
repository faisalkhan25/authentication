
import { envConfig } from './env.config.js';
import {Resend} from 'resend'



const resend = new Resend(envConfig.RESEND_API_KEY);

const sendMail = async ({ email, subject, html }) => {
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: subject,
        html: html
    });

    if (error) {
        throw new Error(error.message || "Failed to send email");
    }

    return data;
}

export default sendMail;