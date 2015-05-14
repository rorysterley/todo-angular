'use strict';

require('angular/angular');
require('angular-route');

var todoApp = angular.module('todoApp', ['ngRoute']);

// Services
require('./services/resource_service')(todoApp);

// Controllers
require('./controllers/todo_controller')(todoApp);

// Directives

// Configuration
todoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/todo', {
    templateUrl: 'templates/todo.html',
    controller: 'todoController'
  })
  .when('/', {
    redirectTo: '/todo'
  })
  .otherwise({
    redirectTo: '/todo'
  });
}]);
