const workoutService = require("../../../../lib/workout");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const updateItem = async (req, res, next) => {
  const {id} = req.params;
  const body = req.body;

  try {
    // update user
    const updatedProduct = await workoutService.updateItem({data: body, id});

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: updatedProduct,
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
      }
    }

    // send final response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = updateItem;