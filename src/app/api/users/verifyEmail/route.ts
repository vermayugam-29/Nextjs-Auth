import connect from '@/dbConfig/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';

connect();

export async function POST(req : NextRequest) {
    try {
        const { token } = await req.json();

        if(!token) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a token to verify email'
            } , {
                status : 400
            })
        }

        const verifyUser = await User.findOne(
            {
                verifyEmailToken : token,
                verifyEmailTokenExpiry : {$gt : Date.now()}
            }
        );

        if(!verifyUser){
            return NextResponse.json({
                success : false,
                message : 'Token is invalid or expired'
            },{
                status : 400
            })
        }

        verifyUser.isVerified = true;
        verifyUser.verifyEmailToken = undefined;
        verifyUser.verifyEmailTokenExpiry = undefined;

        await verifyUser.save();

        return NextResponse.json({
            success : true,
            message : 'User verified successfully',
            data : verifyUser
        } , {
            status : 200
        })

    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Spmething went wrong while verifying email',
            error : error.message
        },{
            status : 500
        })
    }
}