import express from "express";
import * as bookingController from "../controllers/admin/bookingController";
import * as hallController from "../controllers/admin/hallController";
import * as movieController from "../controllers//admin/movieController";
import * as movieShowController from "../controllers/admin/movieShowController";
import * as notificationController from "../controllers/admin/notificationController";
import * as orderController from "../controllers/admin/orderController";
import * as reviewController from "../controllers/admin/reviewController";
import * as snackController from "../controllers/admin/snackController";
import * as starController from "../controllers/admin/starController";
import * as userController from "../controllers/admin/userController";

const router = express.Router();

// User Routes
router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUserById);
router.delete("/users/:id", userController.deleteUserById);

// Routes for bookings
router.post("/bookings", bookingController.createBooking);
router.get("/bookings", bookingController.getAllBookings);
router.get("/bookings/user/:userId", bookingController.getBookingsByUserId);
router.get("/bookings/:id", bookingController.getBookingById);
router.put("/bookings/:id", bookingController.updateBookingById);
router.delete("/bookings/:id", bookingController.deleteBookingById);

// Routes for halls
router.post("/halls", hallController.createHall);
router.get("/halls", hallController.getAllHalls);
router.get("/halls/:id", hallController.getHallById);
router.put("/halls/:id", hallController.updateHallById);
router.delete("/halls/:id", hallController.deleteHallById);

// Routes for movies
router.post("/movies", movieController.createMovie);
router.get("/movies", movieController.getAllMovies);
router.get("/movies/search", movieController.searchMoviesByName);
router.get("/movies/recent", movieController.getRecentlyReleasedMovies);
router.get("/movies/scheduled", movieController.getScheduledMovies);
router.get("/movies/:id", movieController.getMovieById);
router.put("/movies/:id", movieController.updateMovieById);
router.delete("/movies/:id", movieController.deleteMovieById);

// Routes for movie shows
router.post("/movie-shows", movieShowController.createMovieShow);
router.get("/movie-shows", movieShowController.getAllMovieShows);
router.get("/movie-shows/:id", movieShowController.getMovieShowById);
router.get(
  "/movie-shows/by-movie/:movieId",
  movieShowController.getMovieShowsByMovieId
);
router.put("/movie-shows/:id", movieShowController.updateMovieShowById);
router.delete("/movie-shows/:id", movieShowController.deleteMovieShowById);

// Routes for notifications
router.post("/notifications", notificationController.createNotification);
router.delete("/notifications/:id", notificationController.removeNotificationById);
router.get("/notifications/user/:userId", notificationController.getNotificationsByUserId);
router.patch("/notifications/:id/seen", notificationController.updateNotificationSeenStatus);


// Routes for orders
router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderById);
router.put("/orders/:id", orderController.updateOrderById);
router.delete("/orders/:id", orderController.deleteOrderById);

// Routes for reviews
router.post("/reviews", reviewController.createReview);
router.get("/reviews", reviewController.getAllReviews);
router.get("/reviews/:id", reviewController.getReviewById);
router.put("/reviews/:id", reviewController.updateReviewById);
router.delete("/reviews/:id", reviewController.deleteReviewById);

// Routes for snacks
router.post("/snacks", snackController.createSnack);
router.get("/snacks", snackController.getAllSnacks);
router.get("/snacks/:id", snackController.getSnackById);
router.put("/snacks/:id", snackController.updateSnackById);
router.delete("/snacks/:id", snackController.deleteSnackById);

// Routes for stars
router.post("/stars", starController.createStar);
router.get("/stars", starController.getAllStars);
router.get("/stars/:id", starController.getStarById);
router.put("/stars/:id", starController.updateStarById);
router.delete("/stars/:id", starController.deleteStarById);

export default router;
