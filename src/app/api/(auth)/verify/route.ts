import User from '@/models/user.model';
import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request, response: NextResponse) {
    await dbConnect();

    try {
      const { email, verifycode } = await request.json();

      if (!email || !verifycode) {
        return NextResponse.json({message:"all filds are required"},{status: 404})
      }

      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json({message:"user not fould"},{status: 404})
      }

      if (user.isverified) {
        return NextResponse.json({message:"user is already veriied"},{status: 404})
      }

      if (user.verifycode !== verifycode) {
        return NextResponse.json({message:"code doesnot match"},{status: 404})
      }

      if (user.verifycodeexpiry < new Date()) {
        return NextResponse.json({message:"time expired"},{status: 404})
      }

      user.isverified = true;
      await user.save();

      return NextResponse.json({message:"verifeid"},{status: 200})
    } catch (error) {
      console.error('Error verifying user:', error);
      return NextResponse.json({message:"Error verifing uer"},{status: 404})
    }
}
