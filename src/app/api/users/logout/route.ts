import connect from '@/dbConfig/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
require('dotenv').config();
connect();

export async function POST(req : NextRequest) {
    try {
        const res = NextResponse.json({
            success : true,
            message : 'Logged out Successfully'
        } , {
            status : 200
        });

        const token = req.cookies.get('token')?.value;

        if(!token) {
            return NextResponse.json({
                success : false,
                message : 'No user logged in yet'
            } , {
                status : 404
            })
        }

        res.cookies.set('token' , '' , {
            httpOnly : true,
            expires : new Date(0)
        });

        return res;
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went from while logging out from website',
            error : error.message
        } , {
            status  : 500
        })
    }
}