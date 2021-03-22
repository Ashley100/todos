import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String },
    login: { type: String },
    email: { type: String },
    password: { type: String }
});

export default mongoose.model("UserSchema", UserSchema);