import connect from '@/dbConfig/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import sendMail from '@/utils/mailSender';

connect();

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({
                success: false,
                message: 'Please provide with all the details to sign up'
            }, {
                status: 400
            });
        }

        let user = await User.findOne({email});

        if(user) {
            return NextResponse.json({
                success : false,
                message : 'User Already Exists Please try with differnt email'
            } , {
                status : 409
            })
        }


        user = await User.findOne({username});
        if(user) {
            return NextResponse.json({
                success : false,
                message : 'Username Already Taken Please try with differnt username'
            } , {
                status : 409
            })
        }


        const hashedPassword = await bcrypt.hash(password , 10);

        user = await User.create(
            {username , email , password : hashedPassword}
        );

        const mail = await sendMail({email : email , emailType : 'VERIFY' , userId : user._id});

        return NextResponse.json({
            success : true,
            message : 'User registered successfully',
            data : user,
            mail : mail
        } , {
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while making new account please try again later',
            error : error.message
        }, {
            status : 500
        })
    }
}