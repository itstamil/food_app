var express = require('express');
var app = express();

// Declaring global values to handle file and DB module
global.__root   = __dirname + '/';
global.__db   = require(__dirname + '/db.js');

// User Management Controller API base
var UserManagementController = require(__root + 'user/UserController.js');
app.use('/api/user', UserManagementController);

// Food Management Controller API base
var FoodManagementController = require(__root + 'food/FoodController.js');
app.use('/api/food', FoodManagementController);

// Ingredient Management Controller API base
var IngredientManagementController = require(__root + 'ingredient/IngredientController.js');
app.use('/api/ingredient', IngredientManagementController);

module.exports = app;