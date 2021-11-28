import mongoose from 'mongoose'

const MONGODB_URI = process.env.DB_URI

let cached = mongoose.connection

async function dbConnect() {

    if (!MONGODB_URI) {
        process.exitCode = 1
        process.exit()
    }

    if (cached.readyState == 0) {
        mongoose.connect(MONGODB_URI)
        cached = mongoose.connection
    }
    return cached
}

export default dbConnect