'use strict';

// REQUIRE ====================================================================
var express = require('express');
var mongoose = require('mongoose');

var todoRoutes = require('./routes/todo_routes');

// SETTUP =====================================================================
var app = express();
var port = process.env.PORT || 3000;
var subdir = process.env.PRODUCTION ? '/public' : '/build';

app.use(express.static(__dirname + subdir));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todo_dev');

// ROUTES =====================================================================
var todoRouter = express.Router();

todoRoutes(todoRouter);

// --- API V1 ---
app.use('/api/v1', todoRouter);

// SERVER INIT================================================================
app.listen(port, function() {
  console.log('\n==================================\n' +
              '= Server listening on port: ' + port + ' =' +
              '\n==================================\n');
});
