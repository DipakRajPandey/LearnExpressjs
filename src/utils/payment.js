import axios from "axios";
import config from "../config/config.js";

   const   payViaKhalti= async(data)=>{
    const    body=({
    return_url: config.khalti.khalti_return_url,
    website_url: config.app_url,
    amount: data.amount,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: data.customerInfo,
     
    })
    

const response=await axios.post(config.khalti.khalti_api_url,body,{
    headers:{
        Authorization:`Key ${config.khalti.khalti_secret_key}`
    }});

    return response.data;
}

export { payViaKhalti };