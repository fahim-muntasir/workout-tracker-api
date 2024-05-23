const userServices = require("../../../../lib/user");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await userServices.deleteItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: deletedUser,
      selection: ["id", "name", "email", "role", "updated_at", "created_at"],
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
