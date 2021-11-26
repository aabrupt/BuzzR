import mongoose from 'mongoose'

const CACHE = mongoose.connection
const DB_URI = process.env.DB_URI

export default (): mongoose.Connection => {
    if (DB_URI == "" || DB_URI == null) {
        process.exitCode = 1
        process.exit()
    }

    if (CACHE == null) {
        return mongoose.createConnection(DB_URI)
    }

    return CACHE
}