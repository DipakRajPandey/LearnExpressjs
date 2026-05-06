import Product from "../models/Product.js";
import uploadFile from "../utils/fileUploader.js";

const getAllProducts = async (query) => {
  const sort = query.sort ? JSON.parse(query.sort) : {};
  const limit = query.limit ?? 10;
  const offset = query.offset ?? 0;

  const filters = {};

  const { category, brand, name, min, max, createdBy } = query;

  if (category) filters.category = category;
  if (brand) filters.brand = { $in: brand.split(",") };
  if (name) filters.name = { $regex: name, $options: "i" };
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (createdBy) filters.createdBy = createdBy;

  return await Product.find(filters).sort(sort).limit(limit).skip(offset);
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const addProduct = async (product, files, userId) => {
  const uploadedfiles = await uploadFile(files);
  try {
    return await Product.create({
      ...product,
      imageUrls: uploadedfiles.map((file) => file.url),
      createdBy: userId,
    });
  } catch (err) {
    return err.message;
  }
};
const updateProduct=async(data,id)=>{

  return await Product.findByIdAndUpdate(id,data,{new:true})

}
const getCount = async () => {
  return await Product.countDocuments();
};

const getCategory = async () => {
  return await Product.distinct("category");
};

const getBrand = async () => {
  return await Product.distinct("brand");
};
const deleteProduct=async(id)=>{
  return await Product.findByIdAndDelete(id);
}

export default {
  getAllProducts,
  getProductById,
  addProduct,
  getCount,
  getCategory,
  getBrand,
  deleteProduct
};
