import {connectToDb} from '@/dbConfig/dbConfig'
import {NextRequest, NextResponse} from 'next/server'
import User from '@/models/userModel'
connectToDb();
export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiration: { $gt: Date.now() } });
        if(!user) {
            return NextResponse.json({ message: 'Invalid token', status: 400});
        }
        await User.findByIdAndUpdate(user._id, {
            isVerified: true,
            verifyToken: undefined,
            verifyTokenExpiration: undefined
        });
        return NextResponse.json({ message: 'Email Verified Successfully', status: 200});
    } catch (error) {
        console.error('Error sending email: ', error);
        return NextResponse.json({ message: 'Error in Verifying Email', status: 500});
    }
}