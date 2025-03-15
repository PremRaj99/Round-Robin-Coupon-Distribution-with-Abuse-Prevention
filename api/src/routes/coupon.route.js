import express from "express";

import {
    createCoupon,
    deleteCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    validateCoupon
} from "../controllers/coupon.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import Role, {
    authorizeRoles,
} from "../middlewares/authorizeRole.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, authorizeRoles(Role.Admin), createCoupon);
router.get("/", verifyJWT, authorizeRoles(Role.Admin), getAllCoupons);
router.get("/:id", verifyJWT, authorizeRoles(Role.Admin), getCouponById);
router.post("/validate", verifyJWT, validateCoupon);
router.put("/:id", verifyJWT, authorizeRoles(Role.Admin), updateCoupon);
router.delete("/:id", verifyJWT, authorizeRoles(Role.Admin), deleteCoupon);

export default router;
