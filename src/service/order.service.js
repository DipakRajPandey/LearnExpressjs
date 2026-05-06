import { ORDER_STATUS_CONFIRMED } from "../../../mern-20260320-api/src/constants/orderStatus.js";
import { ORDER_STATUS_CANCELLED } from "../constant/orderStatus.js";
import Order from "../models/Order.js";
const getOrders = async () => {
  return await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "userName email phone")
    .populate("orderItems.product", "name category brand price imageUrls");
};
const getOrderById = async (id) => {
  return await Order.findById(id)
    .populate("user", "name,email,phone")
    .populate("orderItems.product", "name category brand price imageUrls");
};
const getOrdersByMerchant = async (id) => {};
const getOrdersByUser = async (id) => {
  return await Order.find({ user: id })
    .sort({ createdAt: -1 })
    .populate("user", "userName email phone")
    .populate("orderItems.product", "name category brand price imageUrls");
};
const createOrder = async (data, id) => {
  return await Order.create({ ...data, user: id });
};
const updateOrderStatus = async (status,id) => {

  return await Order.findByIdAndUpdate(id,{status},{new:true});
};
const deleteOrder = async (id) => {
  await Order.findByIdAndDelete(id);
};
const cancelOrder = async (id,status) => {
   return await Order.findByIdAndUpdate(id,{status:ORDER_STATUS_CANCELLED},{new:true});
};
const confirmOrder = async (id) => {
     return await Order.findByIdAndUpdate(id,{status:ORDER_STATUS_CONFIRMED},{new:true});

};
export default {
  getOrders,
  getOrderById,
  getOrdersByMerchant,
  getOrdersByUser,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
  confirmOrder,
};
