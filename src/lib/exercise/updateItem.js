const { pool } = require("../../db/dbConnection");
const { notFoundError } = require("../../utils/error");

const updateItem = async ({ data = {}, id }) => {
  try {
    // Extract data from the input object
    const {
      exercise_name,
      muscle_group,
      equipment,
      difficulty_level,
      description,
    } = data;

    // Construct the SQL UPDATE query
    const query = {
      text: `
        UPDATE exercises 
        SET 
          exercise_name = COALESCE($1, exercise_name), 
          muscle_group = COALESCE($2, muscle_group), 
          equipment = COALESCE($3, equipment), 
          difficulty_level = COALESCE($4, difficulty_level), 
          description = COALESCE($5, description) 
        WHERE id = $6 
        RETURNING *
      `,
      values: [
        exercise_name,
        muscle_group,
        equipment,
        difficulty_level,
        description,
        id,
      ],
    };

    // Execute the query
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      throw notFoundError("Exercise not found!");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = updateItem;
