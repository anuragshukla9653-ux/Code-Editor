import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  problem: {
    type: mongoose.Schema.Types.Mixed,  // Can be ObjectId (internal) or String (external slug)
    required: true
  },

  language: {
    type: String,
    enum: ["javascript", "python", "cpp"],
    required: true
  },

  code: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: [
      "Accepted",
      "Wrong Answer",
      "Time Limit Exceeded",
      "Compilation Error",
      "Runtime Error"
    ]
  },

  runtime: {
    type: String
  },

  memory: {
    type: String
  },

  testCasesPassed: {
    type: Number,
    default: 0
  },

  totalTestCases: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

// Indexes for performance
submissionSchema.index({ user: 1, problem: 1 });

export default mongoose.model("Submission", submissionSchema);