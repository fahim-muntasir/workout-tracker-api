const { Exercise } = require("../../models");
const { notFoundError } = require("../../utils/error");

const findSingleItem = async (id) => {
  try {
    const result = await Exercise.findItemById(id);

    // Check if the user was found
    if (result.rows.length === 0) {
      throw notFoundError("Exercise not found!");
    }

    // Return the user object
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = findSingleItem;