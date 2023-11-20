import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    student: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Data = mongoose.model("Data", studentSchema);
