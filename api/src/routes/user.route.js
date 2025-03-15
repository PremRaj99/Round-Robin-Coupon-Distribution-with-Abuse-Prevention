import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import Role, {
  authorizeRoles,
} from "../middlewares/authorizeRole.middleware.js";
import {
  changePassword,
  getAllUsers,
  getUserById,
  updateUser,
  userInfo,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", verifyJWT, userInfo);
router.get("/all", verifyJWT, authorizeRoles(Role.Admin), getAllUsers);
router.get("/:id", verifyJWT, authorizeRoles(Role.Admin), getUserById);
router.put("/change-password", verifyJWT, changePassword);
router.put("/:id", verifyJWT, updateUser);

export default router;
