import express from "express";
import productController from "../controller/product.controller.js";
import auth from "../middleware/auth.js";
import roleBaseAuth from "../middleware/roleBasedAuth.js";
import { ADMIN_ROLE, MERCHANT_ROLE } from "../constant/role.js";
import { productSchema } from "../libs/schemas/product.schema.js";
import validation from "../middleware/validation.js";

const router = express.Router();

router.get("/", productController.getAllProducts);

router.post(
  "/",
  auth,
  roleBaseAuth(MERCHANT_ROLE),validation(productSchema),
  productController.addProduct,
);
router.put("/update",auth,roleBaseAuth(ADMIN_ROLE),productController.updateProduct);
router.get("/count", productController.getCount);
router.get("/category", productController.getCategory);
router.get("/brand", productController.getBrand);

//  dynamic routing
router.delete("/delete/:id", auth,roleBaseAuth(MERCHANT_ROLE),productController.deleteProduct)
router.get("/:id", productController.getProductById);

export default router;
