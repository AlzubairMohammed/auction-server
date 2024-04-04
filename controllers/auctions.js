const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { where } = require("sequelize");
const { auctions } = models;

const createAuction = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await auctions.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

const getAuctions = asyncWrapper(async (req, res) => {
  let data = await auctions.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

const getAuction = asyncWrapper(async (req, res) => {
  let data = await auctions.findOne({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});

// Update an existing auction
const editAuction = (req, res) => {
  // Extract the auction ID from the request parameters
  const { id } = req.params;

  // Extract the updated auction data from the request body
  const { title, description, startingPrice } = req.body;

  // Perform any necessary validation on the data

  // Update the auction in the database using the ID
  // Auction.findByIdAndUpdate(id, { title, description, startingPrice }); // Example update operation using a model

  // Return a response indicating success or failure
  res.status(200).json({ message: "Auction updated successfully" });
};

// Delete an auction
const deleteAuction = (req, res) => {
  // Extract the auction ID from the request parameters
  const { id } = req.params;

  // Delete the auction from the database using the ID
  // Auction.findByIdAndDelete(id); // Example delete operation using a model

  // Return a response indicating success or failure
  res.status(200).json({ message: "Auction deleted successfully" });
};

// Export the controller functions
module.exports = {
  createAuction,
  getAuctions,
  getAuction,
  editAuction,
  deleteAuction,
};
