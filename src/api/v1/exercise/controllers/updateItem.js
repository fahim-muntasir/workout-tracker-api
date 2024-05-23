const exerciseService = require("../../../../lib/exercise");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    // update user
    const updatedOrder = await exerciseService.updateItem({ data: body, id });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: updatedOrder,
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
      data,
      links: {
        self: req.originalUrl,
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { updateItem };
