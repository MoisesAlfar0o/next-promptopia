import mongoose from "mongoose";

let isConnected = false

export const connectToDb = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    isConnected = true
    console.log('mongo connected')
  } catch (error) {
      console.log(error)
  }
}