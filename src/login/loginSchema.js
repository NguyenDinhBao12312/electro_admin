import mongoose, { model } from "mongoose";
const adminSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
});
const Admin = model('Admin', adminSchema)
module.exports = adminSchema