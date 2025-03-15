import AbuseReport from "../models/abuseReport.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createAbuseReport = asyncHandler(async (req, res, next) => {
  const { couponId, reason } = req.body;

  const abuseReport = await AbuseReport.create({
    userId: req.user._id,
    couponId,
    reportedAt: new Date(),
    status: "pending",
    reason,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, abuseReport, "Abuse report created successfully")
    );
});

export const getAllAbuseReports = asyncHandler(async (req, res, next) => {
  const abuseReports = await AbuseReport.find();

  res.status(200).json(new ApiResponse(200, abuseReports, "All abuse reports"));
});

export const getAbuseReportById = asyncHandler(async (req, res, next) => {
  const abuseReport = await AbuseReport.findById(req.params.id);

  if (!abuseReport) {
    return next(new ApiError(404, "Abuse report not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, abuseReport, "Abuse report details"));
});

export const updateAbuseReport = asyncHandler(async (req, res, next) => {
  const abuseReport = await AbuseReport.findById(req.params.id);

  if (!abuseReport) {
    return next(new ApiError(404, "Abuse report not found"));
  }

  abuseReport.status = req.body.status;
  await abuseReport.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, abuseReport, "Abuse report updated successfully")
    );
});
