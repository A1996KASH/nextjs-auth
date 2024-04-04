import { connectToDb } from '@/dbConfig/dbConfig'
import  User  from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendMail } from '@/helpers/mailer'

connectToDb();

export async function POST(request: NextRequest) {
try {
    const { username, email, password } = await request.json();
    // validation 
    console.log('username: ', username);
    const user = await User.findOne({ email})
    if(user) {
        return NextResponse.json({ message: 'User already exists', status: 400});
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    const savedUser = await newUser.save();
    console.log('savedUser: ', savedUser);
    // send verification email
    await sendMail({email, emailType: 'VERIFY', userId: savedUser._id});
    return NextResponse.json({ message: 'User created successfully', status: 201});
} catch (error) {
    console.error('Error creating user: ', error);
    return NextResponse.json({ message: 'Error creating user', status: 500});
}
}
