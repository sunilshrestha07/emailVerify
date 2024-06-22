import mongoose, { Document, Model, Schema } from "mongoose";

export interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    isverified: boolean,
    verifycode: number,
    verifycodeexpiry: Date
}

const userSchema: Schema<UserInterface> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isverified:{
        type: Boolean,
        default: false
    },
    verifycode:{
        type: Number,
        required: [true,"verifycode is required"]
    },
    verifycodeexpiry:{
        type: Date
    }
}, { timestamps: true });

// Check if the model is already initialized, if not, initialize it
const User: Model<UserInterface> = mongoose.models.User || mongoose.model<UserInterface>("User", userSchema);

export default User;
