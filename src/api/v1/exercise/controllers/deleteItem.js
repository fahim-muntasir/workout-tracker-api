const exerciseService = require("../../../../lib/exercise");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await exerciseService.deleteItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: deletedOrder,
      selection: [
        "id",
        "exercise_name",
        "muscle_group",
        "difficulty_level",
        "description",
        "updated_at",
        "created_at",
      ],
    });

    const response = {
      code: 200,
      data
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteItem;
