import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendImageToCloudinary } from "../../utils/handleImageUpload";
import { sendResponse } from "../../utils/sendResponse";
import { IProduct } from "./product.interface";
import {
  createProductToDb,
  deleteSingleBikeFromDb,
  getAllProductsFromDb,
  getDbInsightService,
  getFeaturedProductFromDb,
  getRelatedProductFromDb,
  getSingleBikeFromDb,
  insertManyBikesToDb,
  updateBikeToDb,
} from "./product.service";

export const createProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const payload = { ...req.body };
    let imageName = "";
    if (req.file) {
      imageName = `${payload.brand.split(" ").join("-")}-${payload.model
        .split(" ")
        .join("-")}-${Date.now()}`;
      const path = req.file?.path;

      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);

      payload.image = secure_url as string;
    }

    const newProduct = await createProductToDb(payload);
    if (!newProduct) {
      await cloudinary.uploader.destroy(imageName);
      throw new Error("Failed to create bike");
      // Delete the image from Cloudinary if product creation fails
    }
    sendResponse(res, 201, "Bike created successfully", newProduct);
  }
);

//get all bikes
export const getAllProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await getAllProductsFromDb(req.query);
    //send the response
    sendResponse(
      res,
      200,
      "Bikes fetched successfully",
      result.result,
      result.meta
    );
  }
);

//get featured bikes
export const getFeaturedProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const featuredBikes = await getFeaturedProductFromDb();
    //send the response
    sendResponse(
      res,
      200,
      "Featured bikes fetched successfully",
      featuredBikes
    );
  }
);

export const getRelatedProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { productId } = req.params;
    const relatedBikes = await getRelatedProductFromDb(productId);
    //send the response
    sendResponse(res, 200, "Related bikes fetched successfully", relatedBikes);
  }
);
// get a single bike
export const getSingleProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //get the bike id
    const { productId } = req.params;

    //call the service function
    const bike = await getSingleBikeFromDb(productId);
    if (!bike) {
      throw new AppError(404, "Bike not found!");
    }
    //send the response
    sendResponse(res, 200, "Bike fetched successfully", bike);
  }
);

//update a bike
export const updateProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //get the bike id
    const { productId } = req.params;

    //get the update data
    const updateData: Partial<IProduct> = req.body;

    //check if the bike exists
    const bike = await getSingleBikeFromDb(productId);
    if (!bike) {
      throw new AppError(404, "Bike not found!");
    }

    // check if the update data is empty
    if (Object.keys(updateData).length === 0) {
      throw new Error("Update data cannot be empty!");
    }

    // check update data for invalid fields
    const allowedFields = [
      "model",
      "brand",
      "price",
      "category",
      "description",
      "quantity",
      "discount",
    ];
    const productFields = Object.keys(updateData);
    const invalidFields = productFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      throw new AppError(
        400,
        `Update failed! fields: ${invalidFields.join(
          ", "
        )} - does not exist in the product model`
      );
    }

    //call the service function
    const updatedBike = await updateBikeToDb(productId, updateData);

    //send the response
    sendResponse(res, 200, "Bike updated successfully", updatedBike);
  }
);

//delete a bike
export const deleteProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //get the bike id
    const { productId } = req.params;
    // check if the bike exists
    const bike = await getSingleBikeFromDb(productId);
    if (!bike) {
      throw new AppError(404, "Bike not found!");
    }
    //call the service function
    const deletedBike = await deleteSingleBikeFromDb(productId);

    //send the response
    sendResponse(res, 200, "Bike deleted successfully", deletedBike);
  }
);

// insert many bikes
export const insertManyBikes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //get the bikes
    const bikes: IProduct[] = req.body;

    //call the service function
    const insertedBikes = await insertManyBikesToDb(bikes);

    //send the response
    res.status(201).json({
      message: "Bikes inserted successfully",
      success: true,
      data: insertedBikes,
    });
  } catch (error) {
    next(error);
  }
};

//temp
export const getInsightController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await getDbInsightService();
    //send the response
    sendResponse(res, 200, "Database insight fetched successfully", data);
  }
);
