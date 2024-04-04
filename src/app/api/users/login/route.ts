import { connectToDb } from '@/dbConfig/dbConfig'
import  User  from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connectToDb();


export async function POST(request: NextRequest) {

try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email})
    if(!user) {
        return NextResponse.json({ message: 'Invalid email or password', status: 400});
    }
    const salt = await bcryptjs.genSalt(10);
    const comparePassword = await bcryptjs.compare(password, user.password);
    if(!comparePassword) {
        return NextResponse.json({ message: 'Invalid password', status: 400});
    }
    const token = await jwt.sign({username: user.username, email, id: user._id}, process.env.TOKEN_SECRET! , {expiresIn: '1h'});
    const response =  NextResponse.json({ message: 'Login successful', status: 200, data: {token}});
    response.cookies.set('token', token, {
        httpOnly: true,
    });
    return response;
} catch (error) {
    console.error('Error creating user: ', error);
    return NextResponse.json({ message: 'Error creating user', status: 500});
}
}