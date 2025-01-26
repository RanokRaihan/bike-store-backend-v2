import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import validateRequest from "../../middleware/validateRequest";
import { upload } from "../../utils/handleImageUpload";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  insertManyBikes,
  updateProductController,
} from "./product.controller";
import { modifyAsNumber } from "./product.middleware";
import { createProductSchema, updateProductSchema } from "./product.validation";

const productRouter = Router();

//create a new bike
productRouter.post(
  "/create-product",
  auth,
  authorize(["admin"]),
  upload.single("image"),
  modifyAsNumber,
  validateRequest(createProductSchema),
  createProductController
);

// get all bike data
productRouter.get("/", getAllProductController);

// get a single bike data
productRouter.get("/:productId", getSingleProductController);

// update a bike data
productRouter.put(
  "/:productId",
  auth,
  authorize(["admin"]),

  validateRequest(updateProductSchema),
  updateProductController
);

//delete a bike data
productRouter.delete(
  "/:productId",
  auth,
  authorize(["admin"]),
  deleteProductController
);
//

//TEMP: Add this line to the end of the file
// insert many bikes
productRouter.post("/insertMany", insertManyBikes);
//
export default productRouter;
