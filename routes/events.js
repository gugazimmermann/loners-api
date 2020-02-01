const express = require("express");
const events = require("../models/events");

const eventsRouter = express.Router();

eventsRouter
  .route("/")
  .get((req, res, next) => {
    events
      .find({})
      .then(
        events => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(events);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    events
      .create(req.body)
      .then(
        event => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(event);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end("PUT operation not supported on /events");
  })
  .delete((req, res, next) => {
    events
      .deleteMany({})
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

eventsRouter
  .route("/:id")
  .get((req, res, next) => {
    events
      .findById(req.params.id)
      .then(
        event => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(event);
        },
        err => {
          err = new Error(`event with id: ${req.params.id} not found!`);
          res.statusCode = 404;
          return next(err);
        }
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end(`POST operation not supported on /events/${req.params.id}`);
  })
  .put((req, res, next) => {
    events
      .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(
        event => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(event);
        },
        err => {
          err = new Error(`event with id: ${req.params.id} not found!`);
          res.statusCode = 404;
          return next(err);
        }
      )
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    events
      .findByIdAndDelete(req.params.id)
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => {
          err = new Error(`event with id: ${req.params.id} not found!`);
          res.statusCode = 404;
          return next(err);
        }
      )
      .catch(err => next(err));
  });

module.exports = eventsRouter;
