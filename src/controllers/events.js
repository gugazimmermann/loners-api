const Event = require("../database/models/event");

const getAll = async (req, res) => {
  Event.find({})
    .then(
      event => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      },
      err => res.send(err)
    )
    .catch(err => res.send(err));
};

const create = async (req, res) => {
  Event.create(req.body)
    .then(
      event => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      },
      err => res.send(err)
    )
    .catch(err => res.send(err));
};

const put = async (req, res) => {
  res.statusCode = 403;
  res.setHeader("Content-Type", "text/plain");
  res.end("PUT operation not supported on /events");
};

const deleteAll = async (req, res) => {
  Event.deleteMany({})
    .then(
      resp => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      },
      err => res.send(err)
    )
    .catch(err => res.send(err));
};

const getOne = async (req, res) => {
  Event.findById(req.params.id)
    .then(
      event => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      },
      err => {
        err = new Error(`event with id: ${req.params.id} not found!`);
        res.statusCode = 404;
        res.send(err);
      }
    )
    .catch(err => res.send(err));
};

const post = async (req, res) => {
  res.statusCode = 403;
  res.setHeader("Content-Type", "text/plain");
  res.end(`POST operation not supported on /events/${req.params.id}`);
};

const update = async (req, res) => {
  Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(
      event => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      },
      err => {
        err = new Error(`event with id: ${req.params.id} not found!`);
        res.statusCode = 404;
        res.send(err);
      }
    )
    .catch(err => res.send(err));
};

const deleteOne = async (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(
      resp => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      },
      err => {
        err = new Error(`event with id: ${req.params.id} not found!`);
        res.statusCode = 404;
        res.send(err);
      }
    )
    .catch(err => res.send(err));
};

module.exports = {
  getAll,
  create,
  put,
  deleteAll,
  getOne,
  post,
  update,
  deleteOne
};
