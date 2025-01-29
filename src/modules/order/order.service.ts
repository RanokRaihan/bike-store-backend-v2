import QueryBuilder from "../../builder/queryBuilder";
import { OrderFilterableFields } from "./order.constant";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
// create an order
export const createOrderToDb = async (order: IOrder) => {
  try {
    const newOrder = await Order.create(order);
    return newOrder;
  } catch (error) {
    throw error;
  }
};

// update an order
export const updateOrderInDb = async (matchfield: any, updateData: any) => {
  console.log({ matchfield, updateData });

  try {
    const updatedOrder = await Order.findOneAndUpdate(matchfield, updateData, {
      new: true,
    });
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};
// get all orders from the database
export const getOrdersFromDb = async (query: Record<string, unknown>) => {
  try {
    const orderQuery = new QueryBuilder(Order.find(), query)
      .filter(OrderFilterableFields)
      .sort()
      .paginate();
    const result = await orderQuery.modelQuery.populate(
      "products.product user"
    );
    const meta = await orderQuery.countTotal();
    return { result, meta };
  } catch (error) {
    throw error;
  }
};
// get all orders from the database
export const getCustomerOrdersFromDb = async (
  query: Record<string, unknown>,
  userId: string
) => {
  try {
    const orderQuery = new QueryBuilder(Order.find({ user: userId }), query)
      .filter(OrderFilterableFields)
      .sort()
      .paginate();
    const result = await orderQuery.modelQuery.populate(
      "products.product user"
    );
    const meta = await orderQuery.countTotal();
    return { result, meta };
  } catch (error) {
    throw error;
  }
};
