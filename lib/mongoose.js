import mongoose from "mongoose";
export function mongoosConnect(){
  const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
        }
    if( mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    }else{
        return mongoose.connect(uri);
    }
}