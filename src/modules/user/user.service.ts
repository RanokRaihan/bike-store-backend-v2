import QueryBuilder from "../../builder/queryBuilder";
import AppError from "../../errors/ApiError";
import { userFilterableFields, userSearchableFields } from "./user.constant";
import { IUser } from "./user.interface";
import User from "./user.model";

export const findUserWithEmailService = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

//create a user with the given data
export const createUserService = async (data: IUser) => {
  const user = await User.create(data);
  return user;
};

// get all users with queryBuilder
export const getAllUsersService = async (query: any) => {
  try {
    const userQuery = new QueryBuilder(User.find(), query)
      .search(userSearchableFields)
      .filter(userFilterableFields)
      .sort()
      .paginate()
      .fields("-password");

    const result = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();
    return { result, meta };
  } catch (error) {
    throw error;
  }
};

export const toggleUserStatusService = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }
    user.isActive = !user.isActive;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
