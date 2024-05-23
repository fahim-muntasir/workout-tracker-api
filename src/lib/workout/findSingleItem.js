const { Product } = require("../../models");
const { notFoundError } = require("../../utils/error");

const findSingleItem = async (id) => {
  try {
    const result = await Product.findItemById(id);

    // Check if the user was found
    if (result.rows.length === 0) {
      throw notFoundError("Product not found!");
    }

    // Return the user object
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const existProduct = async (id) => {
  try {
    const product = await Product.findItemById(id);

    if (product.rows.length !== 0) {
      return product.rows[0];
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = { findSingleItem, existProduct };
