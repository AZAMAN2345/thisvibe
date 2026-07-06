import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    roomId: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },
    reason: {
      type: String,
      trim: true,
      default: "Inappropriate behavior",
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["open", "reviewed", "dismissed", "actioned"],
      default: "open",
      index: true,
    },
  },
  { timestamps: true },
);

const Report = mongoose.model("Report", ReportSchema);

export default Report;
