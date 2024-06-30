import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import User from '@/models/User';
import mongoose from 'mongoose'
require('dotenv').config();

interface credenntials {
    email: string,
    emailType: string,
    userId: mongoose.Schema.Types.ObjectId | string
}

const mailSender = async ({ email, emailType, userId }: credenntials) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === 'VERIFY') {
            await User.findByIdAndUpdate(
                {_id : userId} ,
                {
                    verifyEmailToken : hashedToken ,
                    verifyEmailTokenExpiry : Date.now() + 60 * 60 * 1000 //1 hour
                },
                {new : true}
            )
        } else {
            await User.findByIdAndUpdate(
                {_id : userId} ,
                {
                    forgotPasswordToken : hashedToken ,
                    forgotPasswordTokenExpiry : Date.now() + 60 * 60 * 1000 //1 hour
                },
                {new : true}
            )
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })


        const response = await transporter.sendMail({
            from: 'Nextjs Auth',
            to: `${email}`,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`

        })

        return response;
    } catch (error : any) {
        throw new Error(error.message);
    }
}

export default mailSender;