const exerciseService = require("../../../../lib/exercise");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    // find user by id
    const order = await exerciseService.findSingleItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: order,
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
        self: req.originalUrl
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleItem;
