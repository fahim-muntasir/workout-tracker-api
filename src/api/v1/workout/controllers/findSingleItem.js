const workoutService = require("../../../../lib/workout");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const findSingleItem = async (req, res, next) => {
  const { id } = req.params;
console.log(id)
  try {
    // find user by id
    const product = await workoutService.findSingleItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: product,
      selection: [
        "id",
        "workout_date",
        "exercise",
        "sets",
        "reps",
        "duration",
        "weight",
        "notes",
        "user_id",
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
