const express = require('express');
const router = express.Router();

const MovieController = require("../controllers/MovieController");

router.post("/create", MovieController.CreateAMovie);
router.get("/allMOvies", MovieController.GetAllMovies);
router.get("/oneMovie/:id", MovieController.GetAMovie);
router.get("/searchMovies", MovieController.SearchMovies)
router.delete("/deleteOne/:id", MovieController.DeleteAMovie);
router.put("/updateMovie/:id", MovieController.UpdateAMovie)
module.exports = router;