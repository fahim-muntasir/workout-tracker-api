const exerciseService = require("../../../../lib/exercise");
const {
  paginationGenerate,
  generatePaginationLinks,
} = require("../../../../utils/pagination");
const { transfromData } = require("../../../../utils/responseData");

const findAllItems = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const sortType = req.query.sortType || "desc";
  const sortBy = req.query.sortBy || "createdat";
  const searchQuery = req.query.search || "";
  const status = req.query.status || "";
  const paymentstatus = req.query.paymentStatus || "";

  try {
    const { data, totalItems } = await exerciseService.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
      status,
      paymentstatus
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
    const orders = transfromData({
      items: data,
      selection: [
        "id",
        "exercise_name",
        "muscle_group",
        "difficulty_level",
        "description",
        "updated_at",
        "created_at",
      ],
      path: req.baseUrl + req.path,
    });

    // final response
    const response = {
      code: 200,
      data: orders,
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

module.exports = findAllItems;
