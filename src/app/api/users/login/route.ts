import connect from '@/dbConfig/dbConnect';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
require('dotenv').config();
connect();

interface TOKEN {
    id : mongoose.Schema.Types.ObjectId | string,
    username : string,
    email : string
}

export async function POST(req : NextRequest) {
    try {
        const {email , password} = await req.json();

        console.log(email)

        if(!email || !password){
            return NextResponse.json({
                success : false,
                message : 'Please fill all the fields to log in'
            } , {
                status : 400
            })
        }

        const user = await User.findOne({email});

        if(!user) {
            return NextResponse.json({
                success : false,
                message : 'User does not exist'
            } , {
                status : 404
            })
        }

        if(user.isVerified && await bcrypt.compare(password , user.password)) {
            const payload : TOKEN = {
                id : user._id,
                username : user.username,
                email : user.email
            };

            const token = jwt.sign(payload , process.env.JWT_SECRET! ,{
                expiresIn : '2d'
            })

            const res =  NextResponse.json({
                success : true,
                message : 'Logged in successfully',
                data : user
            } , {
                status : 200
            })

            res.cookies.set('token' , token , {
                httpOnly : true
            });

            return res;
        }

        return NextResponse.json({
            success : false,
            message : user.isVerified ? 'Password is incorrect' : 'User not verified yet',
        } , {
            status  : 404
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went from while logging in to website',
            error : error.message
        } , {
            status  : 500
        })
    }
}