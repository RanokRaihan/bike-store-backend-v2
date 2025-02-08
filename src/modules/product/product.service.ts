import { ObjectId } from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { Order } from "../order/order.model";
import User from "../user/user.model";
import {
  productFilterableFields,
  productSearchableFields,
} from "./product.constant";
import { IProduct } from "./product.interface";
import Product from "./product.model";

//create a bike in the database
export const createProductToDb = async (product: IProduct) => {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
};

//get all the bikes from the database
export const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  try {
    const productQuery = new QueryBuilder(Product.find(), query)
      .search(productSearchableFields)
      .filter(productFilterableFields)
      .sort()
      .paginate();

    const result = await productQuery.modelQuery;
    const meta = await productQuery.countTotal();
    return { result, meta };
  } catch (error) {
    throw error;
  }
};
export const getFeaturedProductFromDb = async () => {
  try {
    /*
    TODO: Implement the logic to get featured products
    const productQuery = await Product.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(4);
//*/

    const highestPriceProducts = await Product.find()
      .sort({ price: -1 })
      .limit(2);

    const lowestPriceProducts = await Product.find({
      _id: { $nin: highestPriceProducts.map((product) => product._id) },
    })
      .sort({ price: 1 })
      .limit(2);

    const result = [...highestPriceProducts, ...lowestPriceProducts];
    return result;
  } catch (error) {
    throw error;
  }
};

export const getRelatedProductFromDb = async (id: string) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
    }).limit(4);
    console.log({ relatedProducts });
    return relatedProducts;
  } catch (error) {
    throw error;
  }
};

//get a single bike from the database
export const getSingleBikeFromDb = async (id: string | ObjectId) => {
  try {
    const bike = await Product.findById(id);
    return bike;
  } catch (error) {
    throw error;
  }
};

// update bike data in the db
export const updateBikeToDb = async (
  id: string,
  updateData: Partial<IProduct>
) => {
  try {
    const updatedBike = await Product.findByIdAndUpdate(id, updateData, {
      runValidators: true,
      new: true,
    });
    return updatedBike;
  } catch (error) {
    throw error;
  }
};

//delete one bike data
export const deleteSingleBikeFromDb = async (id: string) => {
  try {
    console.log({ id });

    const deletedBike = Product.findOneAndDelete({ _id: id });

    return deletedBike;
  } catch (error) {
    throw error;
  }
};

//extra: insert many bikes
export const insertManyBikesToDb = async (bikes: IProduct[]) => {
  try {
    const insertedBikes = await Product.insertMany(bikes);
    return insertedBikes;
  } catch (error) {
    throw error;
  }
};

// get all db insight

export const getDbInsightService = async () => {
  try {
    const totalBikes = await Product.countDocuments();
    const totalBrands = await Product.distinct("brand");
    const totalCategories = await Product.distinct("category");
    const totalInStock = await Product.countDocuments({ inStock: true });
    const totalOutStock = await Product.countDocuments({ inStock: false });

    // get user insight
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalActiveUsers = await User.countDocuments({ isActive: true });
    const totalInactiveUsers = await User.countDocuments({ isActive: false });

    // get order insight

    const totalOrders = await Order.countDocuments();
    const totalPendingOrders = await Order.countDocuments({
      status: "Pending",
    });
    const totalDeliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });
    const totalCancelledOrders = await Order.countDocuments({
      status: "Cancelled",
    });
    const totalPaidOrders = await Order.countDocuments({ status: "Paid" });
    const totalProcessingOrders = await Order.countDocuments({
      status: "Processing",
    });

    return {
      userInsight: {
        totalUsers,
        totalAdmins,
        totalCustomers,
        totalActiveUsers,
        totalInactiveUsers,
      },
      productInsight: {
        totalBikes,
        totalBrands,
        totalCategories,
        totalInStock,
        totalOutStock,
      },
      orderInsight: {
        totalOrders,
        totalPendingOrders,
        totalDeliveredOrders,
        totalCancelledOrders,
        totalPaidOrders,
        totalProcessingOrders,
      },
    };
  } catch (error) {
    throw error;
  }
};
