import orderService from "../service/order.service.js";

const getOrders = async (req,res) => {
   try{
    const orders=await orderService.getOrders()
    res.status(200).json(orders)
   }catch(err){
    res.status(400).json(err.message)
   }
};
const getOrderById = async (req,res) => {
    console.log(req.params.id)
    try {
        const order=orderService.getOrderById(req.params.id)
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json(error.message)
        
    }
};
const getOrdersByMerchant = async (req,res) => {
            try {
                const data= await orderService.getOrdersByMerchant(req.user._id)
                res.json(data);
            } catch (error) {
                res.status(400).json(error.message)
                
            }






};
const getOrdersByUser = async (req,res) => {
   
    try {
        const orders=await orderService.getOrdersByUser(req.user._id);
         res.status(200).json( orders)
    } catch (error) {
        res.status(400).json(error.message)
        
    }
};
const createOrder = async (req,res) => {
    try {
        const order=await orderService.createOrder(req.body,req.user._id)
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error.message)
    }
};
const updateOrderStatus = async (req,res) => {
    if(!req.body?.status){
        return "Status of order is required"
    }
    try {
        const updatedStatus=await orderService.updateOrderStatus(req.body.status,req.params.id);
        res.status(200).json(updatedStatus)
    } catch (error) {
        res.status(400).json(error.message)
        
    }
};
const deleteOrder = async (req,res) => {
    try {
         await orderService.deleteOrder(req.params.id)
         res.status(200).json({message:"Order Deleted Successfully"});
    } catch (error) {
        res.status(400).json(error.message)
        
    }
};
const cancelOrder = async (req,res) => {
    try {
        const data=await orderService.cancelOrder(req.params.id)
        res.json(data)
    } catch (error) {
        res.status(400).json(error.message)
        
    }
};
const confirmOrder = async (req,res) => {
      try {
        const data=await orderService.confirmOrder(req.params.id,req.body?.status)
        res.json(data)
    } catch (error) {
        res.status(400).json(error.message)
        
    }
};
const orderPaymentViaCash =async(req,res)=>{
    try {
        const data= await orderService.orderPaymentViaCash(req.params.id)
        res.json(data);
    } catch (error) {
        res.status(400).json(error.message)
        
    }
}
const orderPaymentViaKhalti=async(req,res)=>{
    try {
        const data= await orderService.orderPaymentViaCash(req.params.id)
        res.json(data);
    } catch (error) {
        res.status(400).json(error.message)
        
    }
}

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
  orderPaymentViaCash ,
    orderPaymentViaKhalti
};
