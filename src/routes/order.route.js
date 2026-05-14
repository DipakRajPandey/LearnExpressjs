import express from 'express'
import orderController from '../controller/order.controller.js';
import auth from "../middleware/auth.js"
import roleBaseAuth from"../middleware/roleBasedAuth.js"
import {ADMIN_ROLE, CUSTOMER_ROLE, MERCHANT_ROLE} from "../constant/role.js"
import { ROLE_ADMIN } from '../../../mern-20260320-api/src/constants/roles.js';
const router=express.Router();
router.get("/",orderController.getOrders)
router.post("/createOrder",auth,roleBaseAuth(CUSTOMER_ROLE),orderController.createOrder)
router.get("/getOrderByUser",auth,roleBaseAuth(CUSTOMER_ROLE),orderController.getOrdersByUser)
router.get(
  "/merchant",auth,
 roleBaseAuth(MERCHANT_ROLE),
  orderController.getOrdersByMerchant,
);
router.delete("/delete/:id",auth,roleBaseAuth(ROLE_ADMIN),orderController.deleteOrder)


router.put("/:id/status",auth,roleBaseAuth(ADMIN_ROLE),orderController.updateOrderStatus);
router.put("/:id/canceled",auth,roleBaseAuth(ADMIN_ROLE),orderController.cancelOrder);
router.put("/:id/confirmed",auth,roleBaseAuth(ADMIN_ROLE),orderController.confirmOrder);
router.put("/:id/payment/cash",auth,roleBaseAuth(CUSTOMER_ROLE),orderController.orderPaymentViaCash);
router.put("/:id/payment/khalti",auth,roleBaseAuth(CUSTOMER_ROLE),orderController.orderPaymentViaKhalti);

router.get("/:id",orderController.getOrderById)
export default router;