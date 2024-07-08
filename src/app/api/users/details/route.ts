import connect from '@/dbConfig/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { getData } from '@/utils/getDataFromToken'
connect();

export async function GET(req : NextRequest) {
    try {
        const userId = getData(req);

        const user = await User.findById(userId).select('-password');

        if(!user) {
            return NextResponse.json({
                success : false,
                message : 'No token found please login to continue'
            } , {
                status : 400
            })
        }

        return NextResponse.json({
            success : true,
            message : 'User details fetched successfully',
            data : user
        } , {
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false ,
            message : 'Something went wrong while fetching user details',
            error : error.message
        } , {
            status :  500
        })
    }
}