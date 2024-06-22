import connectDB from "@/lib/db";

export async function GET(req: Request, res: Response) {
        await connectDB()
        try {
            console.log("test is working fine")

        } catch (error) {
            console.log("Test is not working")
        }
}