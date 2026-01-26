import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";
import ApiError from "../utils/ApiError.js";

// GET MY CART
export const getMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "title price images stock"
    );

    return res.status(200).json({
      success: true,
      cart: cart || { items: [], totalItems: 0, totalPrice: 0 },
    });
  } catch (error) {
    next(error);
  }
};

// ADD TO CART
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) return next(new ApiError("Product ID is required", 400));

    const product = await Product.findById(productId);
    if (!product) return next(new ApiError("Product not found", 404));

    if (product.stock < quantity)
      return next(new ApiError("Not enough stock", 400));

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        price: product.price,
        title: product.title,
        image: product.images?.[0] || "",
      });
    }

    cart.calculateTotals();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE CART ITEM QTY
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    console.log(productId, quantity, "productId, quantity")

    if (!productId) return next(new ApiError("Product ID is required", 400));
    if (!quantity || quantity < 1)
      return next(new ApiError("Quantity must be >= 1", 400));

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new ApiError("Cart not found", 404));

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return next(new ApiError("Item not found in cart", 404));

    item.quantity = quantity;

    cart.calculateTotals();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// REMOVE ITEM FROM CART
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new ApiError("Cart not found", 404));

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);

    cart.calculateTotals();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// CLEAR CART
export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new ApiError("Cart not found", 404));

    cart.items = [];
    cart.calculateTotals();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
