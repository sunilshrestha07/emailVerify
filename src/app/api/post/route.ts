import connectDB from "@/lib/db";
import User from "@/models/post";

//to post data
export async function POST(request:Request) {
    await connectDB();
    try {
        const { email, password, name } = await request.json();


        const newUser = new User({
            email,
            password,
            name,
        });

        await newUser.save();

        return Response.json({message:"user created",newUser})
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error creating user" }), { status: 500 });
    }
}

export async function GET(request : Request) {
    await connectDB()
    try {
        const users = await User.find()
        return Response.json(users)
    } catch (error) {
        return Response.json({message:"Error fetching data",error})
    }
}