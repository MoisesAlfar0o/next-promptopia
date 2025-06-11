import { connectToDb } from "@/utils/database"
import User from "@/models/user"

export const GET = async (res, { params }) => {
  const { id } = params

  try {
    await connectToDb();

    const user = await User.findById(id)

    if (!user) return new Response('User not found', { status: 404 })

    return new Response(JSON.stringify(user), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fecht user', {
      status: 500
    })
  }
}