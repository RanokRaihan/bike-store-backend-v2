import { ObjectId } from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
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
