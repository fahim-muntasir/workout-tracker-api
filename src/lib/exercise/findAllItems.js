const { pool } = require("../../db/dbConnection");

const findAllItems = async ({
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortType = "desc",
  searchQuery = "",
  muscleGroup = "",
  equipment = "",
  difficultyLevel = ""
}) => {
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Construct the SQL query
    let query = `
      SELECT *,
        COUNT(*) OVER() AS total_count
      FROM exercises
      WHERE 1=1
    `;

    const queryParams = [];

    // Add conditions for search query, muscle group, equipment, and difficulty level
    if (searchQuery) {
      query += `
        AND (exercise_name ILIKE $${queryParams.length + 1} OR description ILIKE $${queryParams.length + 2})
      `;
      queryParams.push(`%${searchQuery}%`, `%${searchQuery}%`);
    }

    if (muscleGroup) {
      query += `
        AND muscle_group = $${queryParams.length + 1}
      `;
      queryParams.push(muscleGroup);
    }
    if (equipment) {
      query += `
        AND equipment = $${queryParams.length + 1}
      `;
      queryParams.push(equipment);
    }

    if (difficultyLevel) {
      query += `
        AND difficulty_level = $${queryParams.length + 1}
      `;
      queryParams.push(difficultyLevel);
    }

    query += `
      ORDER BY ${sortBy} ${sortType.toUpperCase()}
      OFFSET $${queryParams.length + 1}
      LIMIT $${queryParams.length + 2}
    `;
    queryParams.push(offset, limit);

    // Execute the SQL query
    const { rows } = await pool.query(query, queryParams);

    // Extract total count from the first row of the result set
    const totalItems = rows.length > 0 ? parseInt(rows[0].total_count) : 0;

    return { data: rows, totalItems };
  } catch (error) {
    throw error;
  }
};

module.exports = findAllItems;