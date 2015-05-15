'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('todo controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;
  var urlBase = '/api/v1/';

  beforeEach(angular.mock.module('todoApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var todoController = $ControllerConstructor('todoController',
                                                {$scope: $scope});

    expect(typeof todoController).toBe('object');
    expect(Array.isArray($scope.todos)).toBe(true);
  });

  it('should be able to toggle edinting of a todo', function() {
    $ControllerConstructor('todoController', {$scope: $scope});

    var todo1 = {todo: 'test', done: true};
    var todo2 = {todo: 'test', done: true, editing: true};

    $scope.editToggle(todo1);
    $scope.editToggle(todo2);

    expect(todo1.editing).toBe(true);
    expect(todo2.editing).toBe(false);
  });

  describe('REST request', function() {

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      // Create a test controller for each test
      $ControllerConstructor('todoController', {$scope: $scope});

      // Resolve the REST request made by the controller at instantiation
      // Add test data to $scope.todos[0]
      $httpBackend.expectGET(urlBase + 'todo').respond(200, [{todo: 'init'}]);

      $httpBackend.flush();
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    // GET
    it('should get all todos', function() {
      $ControllerConstructor('todoController', {$scope: $scope});

      $httpBackend
        .expectGET(urlBase + 'todo')
        .respond(200, [{todo: 'test', done: true}, {todo: 'win!', done: true}]);

      $httpBackend.flush();

      expect($scope.todos[0].todo).toBe('test');
      expect($scope.todos[0].done).toBe(true);
      expect($scope.todos[1].todo).toBe('win!');
      expect($scope.todos[1].done).toBe(true);
    });

    // POST
    it('should be able to save a todo', function() {
      // This is presint in production/dev context (Angular-Magic)
      $scope.todo = '';

      $scope.create({todo: 'test', done: true});

      $httpBackend
        .expect('POST',
                urlBase + 'todo',
                '{"todo":"test","done":true}')
        .respond(200, {_id: 1, todo: 'test', done: true});

      $httpBackend.flush();

      expect($scope.todos[1]._id).toBe(1);
    });

    // PUT
    it('should be able update a todo', function() {
      var todo = {todo: 'test update', _id: 1, done: true, editing: true};

      $scope.save(todo);

      $httpBackend
        .expect('PUT',
                urlBase + 'todo/1',
                '{"todo":"test update","_id":1,"done":true,"editing":true}')
        .respond(200);

      $httpBackend.flush();
    });

    // DELETE
    it('should be able to delete a todo', function() {
      var todo = {todo: 'test', _id: 1, done: true, editing: true};
      $scope.todos.push(todo);

      $scope.remove(todo);

      $httpBackend
        .expectDELETE(urlBase + 'todo/1')
        .respond(200);

      $httpBackend.flush();

      expect($scope.todos.length).toBe(1);
    });
  });
});
