import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },

  slug: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true
  },

  tags: [{
    type: String
  }],

  examples: [{
    input: String,
    output: String,
    explanation: String
  }],

  constraints: [{
    type: String
  }],

  starterCode: {
    javascript: {
      type: String,
      default: ""
    },

    python: {
      type: String,
      default: ""
    },

    cpp: {
      type: String,
      default: ""
    }
  },

  referenceSolution: {
    javascript: String,
    python: String,
    cpp: String
  },

  visibleTestCases: [{
    input: String,
    output: String
  }],

  hiddenTestCases: [{
    input: String,
    output: String
  }],

  hints: [{
    type: String
  }],

  acceptanceRate: {
    type: Number,
    default: 0
  },

  submissionsCount: {
    type: Number,
    default: 0
  },

  acceptedCount: {
    type: Number,
    default: 0
  },

  companies: [{
    type: String
  }]

}, { timestamps: true });

// Indexes for performance
problemSchema.index({ slug: 1 });

export default mongoose.model("Problem", problemSchema);