import mongoose from "mongoose";

export const REPORT_REASON_VALUES = ["nudity", "harassment", "spam", "other"];

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
      enum: REPORT_REASON_VALUES,
      default: "other",
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
