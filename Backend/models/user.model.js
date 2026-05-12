import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String,
    default: ""
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  solvedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem"
  }],

  totalSubmissions: {
    type: Number,
    default: 0
  },

  acceptedSubmissions: {
    type: Number,
    default: 0
  },

  streak: {
    type: Number,
    default: 0
  },

  maxStreak: {
    type: Number,
    default: 0
  },

  totalSolved: {
    type: Number,
    default: 0
  },

  easySolved: {
    type: Number,
    default: 0
  },

  mediumSolved: {
    type: Number,
    default: 0
  },

  hardSolved: {
    type: Number,
    default: 0
  },

  ranking: {
    type: Number,
    default: 0
  },

  preferredLanguage: {
    type: String,
    enum: ["javascript", "python", "cpp"],
    default: "javascript"
  },

  lastSubmissionDate: {
    type: Date
  },

  accountStatus: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active"
  },

  profileVisibility: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);