const { pool } = require("../../db/dbConnection");
const { notFoundError } = require("../../utils/error");

const updateItem = async ({ data = {}, id }) => {
  try {
    // Extract data from the input object
    const {
      workout_date,
      exercise,
      sets,
      reps,
      duration,
      weight,
      notes,
    } = data;

    // Construct the SQL UPDATE query
    const query = {
      text: `
        UPDATE workouts 
        SET 
          workout_date = COALESCE($1, workout_date), 
          exercise = COALESCE($2, exercise),  
          sets = COALESCE($3, sets), 
          reps = COALESCE($4, reps), 
          duration = COALESCE($5, duration), 
          weight = COALESCE($6, weight), 
          notes = COALESCE($7, notes)
        WHERE id = $8 
        RETURNING *
      `,
      values: [
        workout_date, 
        exercise, 
        sets, 
        reps, 
        duration, 
        weight, 
        notes, 
        id
      ]
    };

    // Execute the query
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      throw notFoundError("Workout not found!");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = updateItem;