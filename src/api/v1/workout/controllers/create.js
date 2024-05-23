const { generateBadRequestError } = require("../../../../utils/error");
const workoutService = require("../../../../lib/workout");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const create = async (req, res, next) => {
  try {
    const { workout_date, exercise, sets, reps, duration, weight, notes } =
      req.body;

    if (!workout_date || !exercise || !sets || !reps || !duration) {
      const error = generateBadRequestError({
        properties: { workout_date, exercise, sets, reps, duration },
      });
      return next(error);
    }

    // Insert Workout into the database
    const newWorkout = await workoutService.create({
      workout_date,
      exercise,
      sets,
      reps,
      duration,
      weight,
      notes,
      user_id: req?.user.id,
    });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: newWorkout,
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
      code: 201,
      data,
      links: {
        self: `/workouts/${newWorkout.id}`,
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
