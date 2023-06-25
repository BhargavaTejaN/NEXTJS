import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {

    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("Already Connected To MongoDB");
        return;
    }

    try {
        const mondodburi = process.env.MONGO;
        await mongoose.connect(mondodburi,{useNewUrlParser : true,useUnifiedTopology : true});
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        throw new Error("connection failed");
    }
}

export default connect;