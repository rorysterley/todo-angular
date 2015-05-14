'use strict';

module.exports = function(app) {
  app.controller('todoController', ['$scope', 'resource', function($scope,
    resource) {
    $scope.todos = [];

    var Todo = resource('todo');

    $scope.getAll = function() {
      Todo.getAll(function(data) {
        $scope.todos = data;
      });
    };

    $scope.create = function(todo) {
      Todo.create(todo, function(data) {
        $scope.todos.push(data);
        $scope.todo.todo = '';
      });
    };

    $scope.save = function(todo) {
      Todo.save(todo, function(data) {});
    };

    $scope.remove = function(todo) {
      Todo.remove(todo, function() {
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
      });
    };

    $scope.editToggle = function(todo) {
      if (todo.editing) {
        todo.editing = false;
        $scope.save(todo);
      } else {
        todo.editing = true;
      }
    };

    $scope.getAll();
  }]);
};
