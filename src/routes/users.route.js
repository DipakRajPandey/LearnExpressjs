import Express from "express";

import userController from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import validation from "../middleware/validation.js";
import userSchema from "../libs/schemas/user.schema.js";
import roleBaseAuth from "../middleware/roleBasedAuth.js";
import { ADMIN_ROLE } from "../constant/role.js";

const router = Express.Router();

router.get(
  "/getAllUser",
  auth,
  roleBaseAuth(ADMIN_ROLE),
  userController.getAllUsers,
);
router.post(
  "/addUser",
  auth,
  validation(userSchema),
  roleBaseAuth(ADMIN_ROLE),
  userController.addUser,
);

router.put("/updateUser/:id", userController.updateUser);
router.delete("/:id", roleBaseAuth(ADMIN_ROLE), userController.deleteUser);
router.patch(
  "/:id/roles",
  roleBaseAuth(ADMIN_ROLE),
  userController.updateRoles,
);
router.put("/profile-update", userController.updateProfile);

router.get("/:id", auth, userController.getUserById);

export default router;
