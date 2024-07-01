import { NextRequest } from "next/server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

interface TOKEN {
    id : mongoose.Schema.Types.ObjectId | string,
    username : string,
    email : string
}

export const getData = (req : NextRequest) => {
    try {
        const token = req.cookies.get('token')?.value || '';
        const decodedToken : any = jwt.verify(token , process.env.JWT_SECRET!);
        console.log(decodedToken)
        return decodedToken.id;
    } catch (error : any) {
        throw new Error(error.message);
    }
}