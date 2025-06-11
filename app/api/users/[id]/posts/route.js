import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

export const GET = async (res, { params }) => {
  const { id } = await params
  try {
    await connectToDb()

    const prompts = await Prompt.find({
      creator: id
    }).populate('creator')  
    
    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    console.log(error)
     return new Response('Failed to fecht all prompts', {
      status: 500
    })
  }
}