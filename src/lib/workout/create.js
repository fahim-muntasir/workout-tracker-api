const { Workout } = require("../../models");

const create = async ({
  workout_date,
  exercise,
  sets,
  reps,
  duration,
  weight,
  notes,
  user_id,
}) => {
  try {
    const workout = await Workout.create({
      workout_date,
      exercise,
      sets,
      reps,
      duration,
      weight,
      notes,
      user_id,
    });

    return workout.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = create;
