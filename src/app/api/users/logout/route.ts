import { connectToDb } from '@/dbConfig/dbConfig'
import {NextRequest, NextResponse} from 'next/server'


connectToDb();

export async function GET(request: NextRequest) {
    try{
      const response = NextResponse.json({ message: 'Logout successful', status: 200});
      response.cookies.set('token', '', {
          httpOnly: true,
          expires: new Date(0)
      });
        return response;
    } catch (error) {
        console.error('Error in logout: ', error);
        return NextResponse.json({ message: 'Error in Logout', status: 500});
    }
}