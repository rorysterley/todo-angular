'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/todo_test';
require('../../server.js');

var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
var Todo = require('../../models/Todo');

chai.use(chaihttp);

var expect = chai.expect;
var urlBase = 'localhost:3000/api/v1';

// Tests ======================================================================
describe('Todo endpoints', function() {

  // Setup --------------------------------------------------------------------
  var todoId;

  before(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  before(function(done) {
    var newTodo = new Todo();
    newTodo.todo = 'Must finish project!';
    newTodo.save(function(err, todo) {
      if (err) { return console.error('Could not create todo.'); }

      todoId = todo._id;

      done();
    });
  });

  // Tests --------------------------------------------------------------------

  // GET
  it('should get a todo', function(done) {
    chai.request(urlBase)
      .get('/todo')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(1);
        expect(res.body[0].todo).to.eql('Must finish project!');
        expect(res.body[0].done).to.eql(false);

        done();
      });
  });

  // POST
  it('should create a todo', function(done) {
    chai.request(urlBase)
      .post('/todo')
      .send({'todo': 'Build an app.'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.exist; // jshint ignore:line
        expect(res.body.todo).to.eql('Build an app.');

        done();
      });
  });

  // PUT
  it('should overwrite a todo', function(done) {
    chai.request(urlBase)
      .put('/todo/' + todoId)
      .send({'todo': 'Build a better app!', 'done': true})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.exist; // jshint ignore:line
        expect(res.body.todo).to.eql('Build a better app!');
        expect(res.body.done).to.eql(true);

        done();
      });
  });

  // DELETE
  it('should delete a todo', function(done) {
    chai.request(urlBase)
      .delete('/todo/' + todoId)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('Todo with id: ' + todoId + ' deleted.');

        done();
      });
  });
});
