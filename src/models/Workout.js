const { pool } = require("../db/dbConnection");

const Workout = {
  create: ({
    workout_date,
    exercise,
    sets,
    reps,
    duration,
    weight,
    notes,
    user_id,
  }) =>
    pool.query(
      "INSERT INTO workouts (workout_date, exercise, sets, reps, duration, weight, notes, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [workout_date, exercise, sets, reps, duration, weight, notes, user_id]
    ),

  findItemById: (id) =>
    pool.query("SELECT * FROM workouts WHERE id = $1", [id]),

  findItemByWorkoutIds: (workoutIdsString) =>
    pool.query(`SELECT * FROM workouts WHERE id IN (${workoutIdsString})`),

  deleteItemById: (id) =>
    pool.query("DELETE FROM workouts WHERE id = $1 RETURNING *", [id]),
};

module.exports = Workout;
