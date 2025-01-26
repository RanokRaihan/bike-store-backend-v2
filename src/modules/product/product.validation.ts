import { z } from "zod";
import { bikeCategories, categoryMessage } from "./product.constant";
const bikeCategoriesEnum = z.enum(bikeCategories, {
  required_error: categoryMessage([...bikeCategories]),
});
export const createProductSchema = z.object({
  body: z
    .object({
      brand: z.string({ required_error: "Brand is required" }),
      model: z.string({ required_error: "Model is required" }),
      description: z.string({ required_error: "Description is required" }),
      price: z.number({ required_error: "Price is required" }),
      discount: z.number().optional(),
      category: bikeCategoriesEnum,
      quantity: z.number({ required_error: "Quantity is required" }),
    })
    .strict(),
});
