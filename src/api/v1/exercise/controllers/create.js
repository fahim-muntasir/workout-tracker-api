const { generateBadRequestError } = require("../../../../utils/error");
const exerciseService = require("../../../../lib/exercise");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const create = async (req, res, next) => {
  try {
    const {
      exercise_name,
      muscle_group,
      equipment,
      difficulty_level,
      description,
    } = req.body;

    if (!exercise_name || !muscle_group || !equipment || !difficulty_level) {
      const error = generateBadRequestError({
        properties: {
          exercise_name,
          muscle_group,
          equipment,
          difficulty_level,
        },
      });
      return next(error);
    }

    // Insert Product into the database
    const newExercise = await exerciseService.create({
      exercise_name,
      muscle_group,
      equipment,
      difficulty_level,
      description,
    });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: newExercise,
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
      code: 201,
      data,
      links: {
        self: `/exercise/${newExercise.id}`,
      },
    };

    // final response
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = create;
