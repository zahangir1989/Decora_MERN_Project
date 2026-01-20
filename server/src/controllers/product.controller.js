import Product from "../models/Product.model.js";
import ApiError from "../utils/apiError.js";

/**
 * @desc    Create product (Admin)
 * @route   POST /api/v1/products
 * @access  Admin
 */
export const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, stock, images, category } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      images,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log();
    next(error);
  }
};


// Get Controller


/**
 * @desc    Get all products (Public)
 * @route   GET /api/v1/products
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get single product
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ApiError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product (Admin)
 * @route   PUT /api/v1/products/:id
 * @access  Admin
 */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return next(new ApiError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Delete product (Admin)
 * @route   DELETE /api/v1/products/:id
 * @access  Admin
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ApiError("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};