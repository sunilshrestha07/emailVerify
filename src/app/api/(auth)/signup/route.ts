// Import necessary dependencies and functions
import User from '@/models/user.model';
import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utils/sendmain';

// Export the POST request handler function
export async function POST(request:Request) {
    await dbConnect();

    try {
        const { email, password, name } = await request.json()
        const verificationCode: number = Math.floor(100000 + Math.random() * 900000);


        // Check if email already exists

        if (!email || !password || !name) {
            return NextResponse.json({ message: "All fields are required" });
        }
        
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.isverified) {
                return NextResponse.json({ message: "Email already exists" });
            } else {
                existingUser.verifycode = verificationCode;
                existingUser.verifycodeexpiry = new Date(Date.now() + 180000);
                await existingUser.save();
                console.log('Sending verification email to existing user:', email);
                const emailResponse = await sendVerificationEmail(email, verificationCode);
                if (!emailResponse.success) {
                    return NextResponse.json({ success: false, message: emailResponse.message }, { status: 500 });
                }
                return NextResponse.json({ message: "User register successful", existingUser });
            }
        }
        
        const newUser = new User({
            email,
            password,
            name,
            verifycode: verificationCode,
            verifycodeexpiry: new Date(Date.now() + 180000)
        });
        await newUser.save();
        console.log('Sending verification email to new user:', email);
        const emailResponse = await sendVerificationEmail(email, verificationCode);
        if (!emailResponse.success) {
            return NextResponse.json({ success: false, message: emailResponse.message }, { status: 500 });
        }
        return NextResponse.json({ message: "User register successful", newUser });
        
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({message:"Error registering user"})
    }
}


