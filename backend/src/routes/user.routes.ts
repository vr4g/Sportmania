import bodyParser from "body-parser";
import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", bodyParser.json(), userController.registerUser);
router.post("/login", bodyParser.json(), authController.login);
router.post("/signout", bodyParser.json(), authController.signout);
router.get("/get_user", bodyParser.json(), authController.getUser);
router.post("/refresh_token", bodyParser.json(), authController.refreshToken);

export default router;
