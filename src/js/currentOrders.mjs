
import { getOrders } from "./externalServices.mjs";

export async function currentOrders(token) {
  try {    
    const orderList = await getOrders(token);
    console.log(orderList);
  } catch (error) {
    console.log(error);
  }
}