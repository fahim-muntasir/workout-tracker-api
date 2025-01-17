const { Workout } = require("../../models");
const { notFoundError } = require("../../utils/error");

const deleteItem = async (id) => {
  try {
    const result = await Workout.deleteItemById(id);

    if (result.rowCount === 0) {
      throw notFoundError("Workout not found!");
    }

    // Return the deleted user object
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = deleteItem;