import Express from "express"

import userController from "../controller/user.controller.js"
import auth from "../middleware/auth.js";
import validation from "../middleware/validation.js";
import userSchema from "../libs/schemas/user.schema.js";

const router =Express.Router();

router.get("/getAllUser",auth,userController.getAllUsers)
router.post("/addUser",auth,validation(userSchema),userController.addUser)
router.get("/:id",auth,userController.getUserById)

export default router;