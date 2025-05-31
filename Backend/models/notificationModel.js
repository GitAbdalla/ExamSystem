import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({

    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    message:{
        type:String,
        required:true,
    },
    read:{
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.Now
    }
})
export default mongoose.model("Notification" , notificationSchema)