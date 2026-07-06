import express from "express";
import { protect } from "../Models/Middleware.js";
import Report from "../Models/ReportModel.js";
import User from "../Models/UserModel.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const reportedUserId = String(req.body.reportedUserId || "").trim();
    const roomId = String(req.body.roomId || "").trim();
    const reason = String(req.body.reason || "Inappropriate behavior").trim();

    if (!reportedUserId) {
      return res.status(400).json({ message: "Reported user is required." });
    }

    if (reportedUserId === String(req.authUser._id)) {
      return res.status(400).json({ message: "You cannot report yourself." });
    }

    const reportedUser = await User.findById(reportedUserId).select("_id");
    if (!reportedUser) {
      return res.status(404).json({ message: "Reported user was not found." });
    }

    const report = await Report.create({
      reporter: req.authUser._id,
      reportedUser: reportedUser._id,
      roomId,
      reason: reason || "Inappropriate behavior",
    });

    await User.updateOne(
      { _id: reportedUser._id },
      { $inc: { reportCount: 1 } },
    );

    res.status(201).json({
      message: "Report submitted.",
      reportId: report._id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Unable to submit report.",
    });
  }
});

export default router;
