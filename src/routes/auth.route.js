import express from 'express'
import authController from "../controller/auth.controller.js"
import validation from '../middleware/validation.js';
import{loginSchema,registerSchema}from '../libs/schemas/auth.schema.js';
const router=express.Router();

router.post("/login",validation(loginSchema),authController.login);
router.post("/register",validation(registerSchema),authController.register)
router.post("/forgot-password",authController.forgetPassword)
router.post("/reset-password",authController.resetPassword)
export default router;