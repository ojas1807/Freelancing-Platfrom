import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["client", "freelancer"], 
      required: true 
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

// import { Schema, model } from 'mongoose';
// import { genSalt, hash, compare } from 'bcryptjs';

// const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   role: {
//     type: String,
//     enum: ['client', 'freelancer'],
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   verified: {
//     type: Boolean,
//     default: false
//   },
//   avatar: {
//     type: String
//   }
// });

// // Password hash middleware
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await genSalt(10);
//     this.password = await hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // Compare password method
// UserSchema.methods.comparePassword = async function(candidatePassword) {
//   return await compare(candidatePassword, this.password);
// };

// export default model('User', UserSchema);