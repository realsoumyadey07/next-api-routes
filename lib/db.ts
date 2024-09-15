import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI ;

const connectDb = async ()=> {
    const connectionState = mongoose.connection.readyState;
    if(connectionState === 1){
        console.log("Mongodb is already connected");
        return;
    }
    if(connectionState === 2){
        console.log("Mongodb is connecting...");
        return;
    }
    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: "next-api-route",
            bufferCommands: true
        });
        console.log("Mongodb is connected!");
    } catch (error: any) {
        console.log("Error while connecting to MongoDb", error);
        throw new Error("Error while connecting to Mongo", error);
    }
    
}

export default connectDb;