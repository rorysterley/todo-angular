'use strict';

var bodyparser = require('body-parser');
var Todo = require('../models/Todo');

module.exports = function(app) {
  app.use(bodyparser.json());

  // GET
  app.get('/todo', function(req, res) {
    Todo.find({}, function(err, data) {
      if (err) { return res.status(500).send({'msg': 'Could not retrive.'}); }

      res.json(data);
    });
  });

  // POST
  app.post('/todo', function(req, res) {
    var newTodo = new Todo(req.body);
    newTodo.save(function(err, todo) {
      if (err) { return res.status(500).send({'msg': 'Could not update.'}); }

      res.json(todo);
    });
  });

  // PUT
  app.put('/todo/:id', function(req, res) {
    var updatedTodo = req.body;
    delete updatedTodo._id;
    Todo.update({_id: req.params.id}, updatedTodo, function(err) {
      if (err) { return res.status(500).send({'msg': 'Could not update.'}); }

      res.json(req.body);
    });
  });

  // DELETE
  app.delete('/todo/:id', function(req, res) {
    Todo.remove({_id: req.params.id}, function(err) {
      if (err) { return res.status(500).send({'msg': 'Could not delete.'}); }

      res.json({'msg': 'Todo with id: ' + req.params.id + ' deleted.'});
    });
  });
};
