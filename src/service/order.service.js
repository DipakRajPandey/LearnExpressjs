import {
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_ONLINE,
  PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_SUCCESS,
} from "../constant/payment.js";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
} from "../constant/orderStatus.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import userService from "./user.service.js";
import Crypto from "crypto";
import { payViaKhalti, payViaStripe } from "../utils/payment.js";
import mongoose from "mongoose";
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
const getOrdersByMerchant = async (merchantId) => {

  return await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "orderUser",
      },
    },
    {
      $unwind: "$orderUser",
    },

    {
      $unwind: "$orderItems",
    },

    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "product",
      },
    },

    {
      $unwind: "$product",
    },

    {
      $match: {
        "product.createdBy": new mongoose.Types.ObjectId(merchantId),
      },
    },

    {
      $project: {
        orderNumber: 1,
        payment: 1,
        shippingAddress: 1,
        status: 1,
        totalPrice: 1,
        createdAt: 1,

        "orderUser._id": 1,
        "orderUser.name": 1,
        "orderUser.email": 1,
        "orderUser.phone": 1,

        orderItem: {
          quantity: "$orderItems.quantity",
        },

        product: {
          _id: "$product._id",
          name: "$product.name",
          price: "$product.price",
          brand: "$product.brand",
          category: "$product.category",
          imageUrls: "$product.imageUrls",
        },
      },
    },
  ]);
};
const getOrdersByUser = async (id) => {
  return await Order.find({ user: id })
    .sort({ createdAt: -1 })
    .populate("user", "userName email phone")
    .populate("orderItems.product", "name category brand price imageUrls");
};
const createOrder = async (data, authUser) => {
 const user=await userService.getUserById(authUser._id,authUser);
 if(!data.shippingAddress){
    data.shippingAddress=user.address;
 }
 data.orderNumber=Crypto.randomUUID();
 data.user=authUser._id;

  return await Order.create(data);
};
const updateOrderStatus = async (status, id) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};
const deleteOrder = async (id) => {
  await Order.findByIdAndDelete(id);
};
const cancelOrder = async (id, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCELLED },
    { new: true },
  );
};
const confirmOrder = async (id, status) => {
  const order = await getOrderById(id);
  if (status?.toUpperCase() != PAYMENT_STATUS_SUCCESS) {
    await Payment.findByIdAndUpdate(order.payment, {
      status: PAYMENT_STATUS_FAILED,
    });
    throw { status: 400, message: "Payment is failed" };
  }
  await Payment.findByIdAndUpdate(order.payment, {
    status: PAYMENT_STATUS_SUCCESS,
  });

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CONFIRMED },
    { new: true },
  );
};

const orderPaymentViaCash = async (id) => {
  const order = await getOrderById(id);
  console.log(order)
  const orderPayment = await Payment.create({
    method: PAYMENT_METHOD_CASH,
    amount: order.totalPrice,
  });

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CONFIRMED, payment: orderPayment._id },
    { new: true },
  );
};

const orderPaymentViaKhalti = async (id) => {
  const order = await getOrderById(id);
  console.log(order)
  const orderPayment = await Payment.create({
    method: PAYMENT_METHOD_ONLINE,
    amount: order.totalPrice,
  });
 await Order.findByIdAndUpdate(id,{payment:orderPayment._id})


  return await payViaKhalti({amount:order.totalPrice,
    purchaseOrderId:order._id,
    purchaseOrderName:order.orderItems[0].product.name,
    customerInfo:{
      name:order.user.name,
      email:order.user.email,
      phone:order.user.phone
    }
  })
};
const orderPaymentViaStripe = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: PAYMENT_METHOD_CARD,
    amount: order.totalPrice,
  });

  await Order.findByIdAndUpdate(id, {
    payment: orderPayment.id,
  });

  return await payViaStripe({
    amount: order.totalPrice,
    orderId: order.orderNumber,
    orderName: order.orderItems[0].product.name,
    customer: {
      name: order.user.name,
      email: order.user.email,
      phone: order.user.phone,
    },
  });
};
export default {
  orderPaymentViaCash,
  getOrders,
  getOrderById,
  getOrdersByMerchant,
  getOrdersByUser,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
  confirmOrder,
  orderPaymentViaKhalti,
  orderPaymentViaStripe
 
};
