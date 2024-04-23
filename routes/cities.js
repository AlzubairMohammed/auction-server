const router = require("express").Router();
const { citiesValidator } = require("../validations/cities");
const {
  getCities,
  getCity,
  createCity,
  editCity,
  deleteCity,
  getCitiesByArea,
} = require("../controllers/cities");

router
  .post("/", citiesValidator(), createCity)
  .get("/", getCities)
  .get("/:id", getCity)
  .put("/:id", editCity)
  .delete("/:id", deleteCity)
  .get("/area/:id", getCitiesByArea);

module.exports = router;
