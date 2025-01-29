import { z } from "zod";

export const orderValidationSchema = z
  .object({
    body: z
      .object({
        products: z
          .array(
            z.object({
              product: z.string().nonempty("Product is required"),
              quantity: z.number().min(1, "Quantity must be at least 1"),
            })
          )
          .nonempty("At least one product is required"),
        address: z.object({
          fullName: z.string().nonempty("Full name is required"),
          address1: z.string().nonempty("Address is required"),
          address2: z.string().optional(),
          postalCode: z.string().nonempty("Postal code is required"),
          phone: z.string().nonempty("Phone number is required"),
          city: z.string().nonempty("City is required"),
          country: z.string().nonempty("Country is required"),
        }),
      })
      .strict(),
  })
  .strict();
