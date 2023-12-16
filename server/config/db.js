import Mongoose from "mongoose";

const connectDB = async (dbUrl) => {
    try {
        const conn = await Mongoose.connect(dbUrl, { dbName: 'ecommerce_one' })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }

}

export default connectDB