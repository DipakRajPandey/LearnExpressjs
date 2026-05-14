import { ADMIN_ROLE, SUPER_ADMIN_ROLE } from "../constant/role.js";
import User from "../models/User.js";
import authServicer from "../service/auth.service.js";
import uploadFile from "../utils/fileUploader.js";

const getAllUsers = async (query) => {
  const sort = query.sort ? JSON.parse(query.sort) : {};
  const limit = query.limit ?? 10;
  const offset = query.offset ?? 0;

  const filter = {};
  const { name, email, phone } = query;

  if (name) filters.name = { $regex: name, $options: "i" };
  if (email) filters.email = { $regex: email, $options: "i" };
  if (phone) filters.phone = { $regex: phone, $options: "i" };

  return await User.find(filters).sort(sort).limit(limit).skip(upset);
};
const addUser = async (userDetails) => {
  return await authServicer.register(userDetails);
};
const getUserById = async (id) => {
  return await User.findById(id);
};
const updateUser = async (id, details, user) => {
  if (user._id !== id && !user.role.includes(ADMIN_ROLE)) {
    throw {
      status: 403,
      message: "Access denied.",
    };
  }
  return await User.findByIdAndUpdate(
    id,
    {
      userName: details?.userName,
      phone: details?.phone,
      address: details?.address,
      isActive: details?.isActive,
    },
    { returnDocument: "after" },
  );
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return "User deleted Successfully";
};

const updateRoles = async (id, roles, user) => {
  if (
    (roles.includes(ADMIN_ROLE) || roles.includes(SUPER_ADMIN_ROLE)) &&
    !authUser.roles.includes(SUPER_ADMIN_ROLE)
  ) {
    throw {
      status: 403,
      message: "Access denied.",
    };
  }

  return await User.findByIdAndUpdate(
    id,
    { role: roles },
    { returnDocument: "after" },
  );
};

const updateProfile = async (id, file) => {
  const uploadedFiles = await uploadFile([file]);
  const user = await User.findByIdAndUpdate(
    id,
    { imageUrls: uploadedFiles[0].url },
    { returnDocument: "after" },
  );
  return user;
};

export default {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  updateRoles,
  updateProfile,
};
