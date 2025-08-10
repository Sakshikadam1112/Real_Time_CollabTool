import mongoose from "mongoose"

const docSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    owner:{//this alows only that user to acces his
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true ,   
    },
    createdAt: { type: Date, default: Date.now },    
})

const Document=mongoose.model("Document",docSchema);

export default Document;