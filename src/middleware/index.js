const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const middleware = (app) => {
  app.use(morgan("combined"));
  app.use(cors());
  app.use(express.json());
};

module.exports = middleware;
