import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  //将req体当中的json解构其 userId, prompt , tag属性
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    console.log("创建的userid",userId)
    //创建一个新的prompt
    const newPrompt = new Prompt({
      creator: userId,
      tag: tag,
      prompt: prompt,
    });

    //将新创建的对象存入数据库
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("创建prompt 报错 ", error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
