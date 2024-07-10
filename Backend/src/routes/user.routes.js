import { Router } from "express";
import {
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    checkLoginStatus,   
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/Signup").post(registerUser);
router.route("/Login").post(loginUser);

// secured routes
router.route("/Logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/check-login-status").post(checkLoginStatus);

export default router;
