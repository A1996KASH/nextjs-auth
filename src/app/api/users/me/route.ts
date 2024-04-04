import { connectToDb } from '@/dbConfig/dbConfig'
import { getDatafromToken } from '@/helpers/getDatafromToken';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server'
connectToDb();

export async function POST(request: NextRequest) {
   // extract data from token
   const userId = await getDatafromToken(request);
   const user = await  User.findOne({ _id: userId }).select('-password')
    if(!user) {
        return NextResponse.json({ message: 'User not found', status: 404});
    }
    return NextResponse.json({ message: 'User found', status: 200, data: user});
}