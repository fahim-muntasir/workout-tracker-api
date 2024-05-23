const { Exercise } = require("../../models");

const create = async ({
  exercise_name,
  muscle_group,
  equipment,
  difficulty_level,
  description,
}) => {
  try {
    const exercise = await Exercise.create({
      exercise_name,
      muscle_group,
      equipment,
      difficulty_level,
      description,
    });

    return exercise.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = create;
