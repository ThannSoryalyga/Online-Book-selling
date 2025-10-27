import mongoose, { Schema } from "mongoose";
import { Icategory } from "@/types/categoryType";

const categorySchema = new Schema<Icategory>({
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
}, { timestamps: true });

export default mongoose.model<Icategory>("Category",categorySchema);