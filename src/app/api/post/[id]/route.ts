import dbConnect from "@/lib/db";
import User from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    await dbConnect();
    try {
        const { id } = params; // Destructure id from params
        const user = await User.findById(id); // Find user by id
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { 
                status: 404
            });
        }
        return NextResponse.json(user, { 
            status: 200 
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching specific user", error }, { 
            status: 500 
        });
    }
}

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { email, password, name } = await request.json();

        const newUser = new User({
            email,
            password,
            name,
        });

        await newUser.save();

        return NextResponse.json({ message: "User created", newUser }, { 
            status: 201 
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error creating user", error }, { 
            status: 500 
        });
    }
}
