import productService from "../service/product.service.js";
import uploadFile from "../utils/fileUploader.js";

const getAllProducts = async (req, res) => {
  try {
    const data = await productService.getAllProducts(req.query);

    res.json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id at controller ", id);
    const product = await productService.getProductById(id);
    res.json(product);
  } catch (err) {
    res.send(err.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const userId = req.user._id;

    const product = await productService.addProduct(
      req.body,
      req.files,
      userId,
    );

    res.json(product);
  } catch (err) {
    res.send(err.message);
  }
};

const getCount = async (req, res) => {
  try {
    console.log("inside getCount ");
    const count = await productService.getCount();
    res.json(count);
  } catch (error) {
    res.status(400).json(error, message);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await productService.getCategory();
    res.json(category);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getBrand = async (req, res) => {
  try {
    const brand = await productService.getBrand();
    res.json(brand);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const updateProduct = async (req, res) => {
  try {
    const newProduct = await productService.updateProduct(
      req.body,
      req.params.id,
    );
  } catch (err) {
    res.json(err.message);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const data = await productService.deleteProduct(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.send(err.message);
  }
};
export default {
  getAllProducts,
  getProductById,
  addProduct,
  getCount,
  getCategory,
  getBrand,
  updateProduct,
  deleteProduct,
};
