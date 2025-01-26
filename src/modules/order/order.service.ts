import { IOrder } from "./order.interface";
import { Order } from "./order.model";

export const getOrdersFromDb = async (): Promise<IOrder[]> => {
  try {
    return Order.find()
      .populate({
        path: "product",
        select: "-createdAt -updatedAt -__v",
      })
      .exec();
  } catch (error) {
    throw error;
  }
};

// create an order
export const createOrderToDb = async (order: IOrder): Promise<IOrder> => {
  try {
    const newOrder = new Order(order);
    return newOrder.save();
  } catch (error) {
    throw error;
  }
};

//caculate total revenue from orders

export const calculateTotalRevenue = async (): Promise<any> => {
  try {
    const response = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "bike",
        },
      },
      {
        $unwind: "$bike",
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ["$bike.price", "$quantity"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ]);
    return response[0];
  } catch (error) {
    throw error;
  }
};
