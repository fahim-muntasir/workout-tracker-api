const express = require("express");
const router = express.Router();

// controller import
const userController = require("../api/v1/user");
const workoutController = require("../api/v1/workout");
const exerciseController = require("../api/v1/exercise");
const authController = require("../api/v1/auth");

// middleware imports
const authMiddleware = require("../middleware/auth");
const authorizeMiddleware = require("../middleware/authorize");
const ownershipMiddleware = require("../middleware/ownership");

// api health route
router.get("/health", (_req, res) => {
  res.status(200).json({
    health: "Ok",
  });
});

// ======== api/v1 auth route start ========
router.route("/v1/auth/signin").post(authController.signin);
// ======== api/v1 auth route end ========

// ======== api/v1 user route start ========
router
  .route("/v1/users")
  .get(
    authMiddleware,
    authorizeMiddleware(["admin"]),
    userController.findAllItems
  )
  .post(userController.create);

router
  .route("/v1/users/:id")
  .get(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("User"),
    userController.findSingleItem
  )
  .patch(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("User"),
    userController.updateItem
  )
  .delete(
    authMiddleware,
    authorizeMiddleware(["admin"]),
    ownershipMiddleware("User"),
    userController.deleteItem
  );
// ======== api/v1 user route end ========

// ======== api/v1 workout route start ========
router
  .route("/v1/workouts")
  .get(workoutController.findAllItems)
  .post(
    authMiddleware,
    workoutController.create
  );

router
  .route("/v1/workouts/:id")
  .get(workoutController.findSingleItem)
  .patch(
    authMiddleware,
    workoutController.updateItem
  )
  .delete(
    authMiddleware,
    workoutController.deleteItem
  );
// ======== api/v1 workout route end ========

// ======== api/v1 exercise route start ========
router
  .route("/v1/exercise")
  .get(exerciseController.findAllItems)
  .post(
    authMiddleware,
    exerciseController.create
  );

router
  .route("/v1/exercise/:id")
  .get(exerciseController.findSingleItem)
  .patch(
    authMiddleware,
    exerciseController.updateItem
  )
  .delete(
    authMiddleware,
    exerciseController.deleteItem
  );
// ======== api/v1 exercise route end ========

module.exports = router;
