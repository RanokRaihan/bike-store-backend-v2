import mongoose from "mongoose";
import { bikeCategories, categoryMessage } from "./product.constant";
import { IProduct } from "./product.interface";

const { Schema, model } = mongoose;

const productSchema = new Schema<IProduct>(
  {
    brand: {
      type: String,
      required: [true, "Brand is required!"],
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Brand cannot be empty!",
      },
    },
    model: {
      type: String,
      required: [true, "Product name is required!"],
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Product name cannot be empty",
      },
    },

    price: {
      type: Number,
      required: [true, "Price is required!"],
      min: [0, "Price must be a positive number!"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount must be a positive number!"],
      max: [100, "Discount must be less than 100!"],
    },
    salePrice: {
      type: Number,
    },
    category: {
      type: String,
      enum: {
        values: bikeCategories,
        message: categoryMessage([...bikeCategories]),
      },
      required: [true, "Category is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
      validate: {
        validator: (value: string) => value.trim().length > 10,
        message: "Description must be at least 10 characters!",
      },
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required!"],
      min: [0, "Quantity must be a positive number!"],
      validate: {
        validator: (value: number) => Number.isInteger(value),
        message: "Quantity must be an integer!",
      },
    },
    image: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.pre<IProduct>("save", function (next) {
  this.inStock = this.quantity > 0;
  this.salePrice = this.discount
    ? Math.round((this.price - (this.price * this.discount) / 100) * 100) / 100
    : this.price;

  next();
});
productSchema.pre<IProduct>("insertMany", function (next, docs) {
  docs.forEach((doc: IProduct) => {
    doc.inStock = doc.quantity > 0;
    doc.salePrice = doc.discount
      ? Math.round((doc.price - (doc.price * doc.discount) / 100) * 100) / 100
      : doc.price;
  });
  next();
});

productSchema.pre<IProduct>("updateOne", function (next) {
  this.inStock = this.quantity > 0;
  this.salePrice = this.discount
    ? Math.round((this.price - (this.price * this.discount) / 100) * 100) / 100
    : this.price;

  next();
});

//update inStock status before updating the document
productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Partial<IProduct>;

  if (update.quantity !== undefined) {
    if (update.quantity > 0) {
      update.inStock = true;
    } else {
      update.inStock = false;
    }
    this.setUpdate(update);
  }

  // if (update.price !== undefined || update.discount !== undefined) {
  //   const price = update.price !== undefined ? update.price : this.get("price");
  //   const discount =
  //     update.discount !== undefined ? update.discount : this.get("discount");

  //   console.log({ price, discount: this.get("discount") });

  //   update.salePrice = discount
  //     ? Math.round((price - (price * discount) / 100) * 100) / 100
  //     : price;
  //   this.setUpdate(update);
  // }

  next();
});

productSchema.post("findOneAndUpdate", async function (doc: IProduct) {
  if (doc) {
    doc.salePrice = doc.discount
      ? Math.round((doc.price - (doc.price * doc.discount) / 100) * 100) / 100
      : doc.price;
    await doc.save();
  }
});

const Product = model("Product", productSchema);

export default Product;
