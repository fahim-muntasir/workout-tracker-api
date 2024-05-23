const { pool } = require("../db/dbConnection");

const Exercise = {
  create: ({
    exercise_name,
    muscle_group,
    equipment,
    difficulty_level,
    description,
  }) =>
    pool.query(
      "INSERT INTO exercises (exercise_name, muscle_group, equipment, difficulty_level, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [exercise_name, muscle_group, equipment, difficulty_level, description]
    ),

  findItemById: (id) =>
    pool.query("SELECT * FROM exercises WHERE id = $1", [id]),

  findItemByExerciseIds: (exerciseIdsString) =>
    pool.query(`SELECT * FROM exercises WHERE id IN (${exerciseIdsString})`),

  deleteItemById: (id) =>
    pool.query("DELETE FROM exercises WHERE id = $1 RETURNING *", [id]),
};

module.exports = Exercise;