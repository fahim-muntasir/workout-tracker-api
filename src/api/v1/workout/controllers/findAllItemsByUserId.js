const workoutService = require("../../../../lib/workout");
const {
  paginationGenerate,
  generatePaginationLinks,
} = require("../../../../utils/pagination");
const { transfromData } = require("../../../../utils/responseData");

const findAllItemsByUserId = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const sortType = req.query.sortType || "desc";
  const sortBy = req.query.sortBy || "created_at";
  const searchQuery = req.query.search || "";
  const status = req.query.status || "";
  const {id} = req.params;

  try {
    const { data, totalItems } = await workoutService.findAllItemsByUserId({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
      status,
      user_id: id,
    });

    const { pagination, totalPage } = paginationGenerate({
      page,
      limit,
      totalItems,
    });

    const links = generatePaginationLinks({
      path: req.baseUrl + req.path,
      page,
      totalPage,
      limit,
      sortType,
      sortBy,
    });

    // transfrom user data for response
    const products = transfromData({
      items: data,
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
      path: req.baseUrl + req.path,
    });

    // final response
    const response = {
      code: 200,
      data: products,
      pagination,
      links,
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = findAllItemsByUserId;
