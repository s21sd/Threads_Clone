import mongoose from 'mongoose'
let isConnected = false; //  Variable to check wheather mongo is connected or not

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (!process.env.MONGODB_URL)
        return console.log("MONGO_URL not found");
    if (isConnected)
        return console.log("Already Connected to MongoDb")
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}