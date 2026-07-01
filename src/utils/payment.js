import axios from "axios";
import config from "../config/config.js";
// import Stripe from "stripe";

   const   payViaKhalti= async(data)=>{
    // console.log("payViaKhalti  inside payment",data)
    const    body=({
    return_url: config.khalti.khalti_return_url,
    website_url: config.app_url,
    amount: data.amount,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: data.customerInfo,
     
    });
const response=await axios.post(config.khalti.khalti_api_url,body,{
    headers:{
        Authorization:`Key ${config.khalti.khalti_secret_key}`
    }});


    console.log("response after khalti api called ",response.data)
    return response.data;
}
const payViaStripe = async (data) => {
  const stripe = new Stripe(config.stripeSecretKey);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: data.currency || "npr",
    metadata: {
      customer_email: data.customer.email,
      customer_phone: data.customer.phone,
      customer_name: data.customer.name,
      order_id: data.orderId,
      order_name: data.orderName,
    },
  });

  return paymentIntent;
};



export { payViaKhalti,payViaStripe};