import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt"

export async function GET(req) {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')  
        console.log("获取到的数据",prompts)
        return new Response(JSON.stringify(prompts),{status:200})

    } catch(e) {
        console.log("errir ",e)
        return new Response(JSON.stringify("get prompts error"),{status:500})
    }
} 