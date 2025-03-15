import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import Role, {
  authorizeRoles,
} from "../middlewares/authorizeRole.middleware.js";
import {
  createAbuseReport,
  getAbuseReportById,
  getAllAbuseReports,
  updateAbuseReport,
} from "../controllers/abuseReport.controller.js";

const router = express.Router();

router.post("/", verifyJWT, createAbuseReport);
router.get("/", verifyJWT, authorizeRoles(Role.Admin), getAllAbuseReports);
router.get("/:id", verifyJWT, authorizeRoles(Role.Admin), getAbuseReportById);
router.put("/:id", verifyJWT, authorizeRoles(Role.Admin), updateAbuseReport);

export default router;
