import mongoose from "mongoose";

const dbConnection = (url)=>{
mongoose
    .connect(url)
    .then(console.log("Database conncted successfully"))
    .catch((err) => { console.log("Mongo error:", err) })
}

export default dbConnection;