import express from "express";
import productController from "../controller/product.controller.js";
import auth from "../middleware/auth.js";
import roleBaseAuth from "../middleware/roleBasedauth.js";
import { MERCHANT_ROLE } from "../constant/role.js";
import { id } from "zod/v4/locales";

const router = express.Router();

router.get("/", productController.getAllProducts);

router.post(
  "/",
  auth,
  roleBaseAuth(MERCHANT_ROLE),
  productController.addProduct,
);
router.put("/update",productController.updateProduct);
router.get("/count", productController.getCount);
router.get("/category", productController.getCategory);
router.get("/brand", productController.getBrand);

//  dynamic routing
router.delete("/delete/:id",productController.deleteProduct)
router.get("/:id", productController.getProductById);

export default router;
