const { pool } = require("../../db/dbConnection");

const findAllItemsByUserId = async ({
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortType = "desc",
  searchQuery = "",
  status = "",
  user_id
}) => {
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Construct the SQL query
    let query = `
      SELECT w.*, 
             jsonb_build_object(
               'id', e.id,
               'exercise_name', e.exercise_name,
               'muscle_group', e.muscle_group,
               'equipment', e.equipment,
               'difficulty_level', e.difficulty_level,
               'created_at', e.created_at,
               'updated_at', e.updated_at
             ) AS exercise
      FROM workouts w
      INNER JOIN exercises e ON w.exercise = e.id
      WHERE w.user_id = $1
    `;

    const queryParams = [user_id];

    // Add conditions for search query and status
    if (searchQuery) {
      query += `
        AND (e.exercise_name ILIKE $${queryParams.length + 1} OR w.notes ILIKE $${queryParams.length + 1})
      `;
      queryParams.push(`%${searchQuery}%`);
    }
    if (status) {
      query += `
        AND w.status = $${queryParams.length + 1}
      `;
      queryParams.push(status);
    }

    // Add sorting, pagination
    query += `
      ORDER BY ${sortBy} ${sortType === 'desc' ? 'DESC' : 'ASC'}
      OFFSET $${queryParams.length + 1}
      LIMIT $${queryParams.length + 2}
    `;
    queryParams.push(offset, limit);

    // Execute the SQL query
    const { rows } = await pool.query(query, queryParams);

    // Get total count
    const totalCountQuery = `
      SELECT COUNT(*) AS total_count
      FROM workouts w
      INNER JOIN exercises e ON w.exercise = e.id
      WHERE w.user_id = $1
    `;
    const totalCountResult = await pool.query(totalCountQuery, [user_id]);
    const totalItems = parseInt(totalCountResult.rows[0].total_count);

    return { data: rows, totalItems };
  } catch (error) {
    throw error;
  }
};

module.exports = findAllItemsByUserId;
