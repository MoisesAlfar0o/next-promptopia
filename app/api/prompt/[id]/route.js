import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

export const GET = async (res, { params }) => {
  const { id } = await params
  try {
    await connectToDb()

    const prompt = await Prompt.findById(id).populate('creator')
    if (!prompt) return new Response('Prompt not found', { status: 404 })

    return new Response(JSON.stringify(prompt), {
      status: 200
    })
  } catch (error) {
    console.log(error)
     return new Response('Failed to fecht prompt', {
      status: 500
    })
  }
}

export const PATCH = async (res, { params }) => {
  const { id } = await params
  const { prompt, tag } = await res.json()

  try {
    await connectToDb()

    const existingPrompt = await Prompt.findById(id)

    if (!existingPrompt) return new Response('Prompt not found', { status: 404 }) 

    existingPrompt.prompt = prompt 
    existingPrompt.tag = tag 

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), {
      status: 200
    }) 
  } catch (error) {
    return new Response('Failed to update prompt', {
      status: 500
    })
  }
}

export const DELETE = async (res, {params}) => {
 const { id } = await params
  try {
    await connectToDb()
    
    await Prompt.findByIdAndDelete(id)

   return new Response('Prompt deleted successfully', {
      status: 200
    }) 
  } catch (error) {
    return new Response('Failed to delete prompt', {
      status: 500
    })
  }
}