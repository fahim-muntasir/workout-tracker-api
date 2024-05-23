const { pool } = require("../../db/dbConnection");

const findAllItems = async ({
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortType = "desc",
  searchQuery = "",
  status = "",
}) => {
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Construct the SQL query
    let query = `
      SELECT *
      FROM (
        SELECT
          w.*,
          COUNT(*) OVER() AS total_count,
          ROW_NUMBER() OVER (ORDER BY ${sortBy} ${sortType === 'desc' ? 'DESC' : 'ASC'}) AS row_num
        FROM workouts w
        WHERE 1=1
    `;

    const queryParams = [];

    // Add conditions for search query and status
    if (searchQuery) {
      query += `
        AND (exercise ILIKE $1 OR notes ILIKE $1)
      `;
      queryParams.push(`%${searchQuery}%`);
    }
    if (status) {
      query += `
        AND status = $${queryParams.length + 1}
      `;
      queryParams.push(status);
    }

    // Close the subquery
    query += `
      ) AS subquery
      WHERE row_num > $${queryParams.length + 1}
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

module.exports = {findAllItems};