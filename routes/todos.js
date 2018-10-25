var express = require('express');
var router = express.Router();
var myTodos = require('../data/todos.json');
var _ = require('underscore');
// "uderscore.js" is a library that provides kool functionality when working with arrays, objects. Had to run "npm install underscore" to install. Check it out at "underscorejs.org".


/* GET Todos listing. */
router.get('/', function(req, res, next) {
  // Don't need to specify "/todos" here for the URL b/c, in the app.js file, the line "app.use('/todos', todosRouter);" that initializes these route handlers specifies it there. That means that for all the routes on this page, the URL "/todos" is implied.
  console.log(myTodos);
  res.json(myTodos);
});

router.get('/:id', function(req, res) {
  var thisId = parseInt(req.params.id);
  var thisTodo = _.findWhere(myTodos, {id: thisId});
  // _.findWhere is an underscore library that Looks through the list (myTodos) and returns the first value that matches all of the key-value pairs listed in properties
  if (thisTodo) {
    res.json(thisTodo);
  } else {
    res.json({"error": "This Todo doesn't exist."});
  }
});

router.put('/:id', function(req, res) {
  var thisId = parseInt(req.params.id);
  var thisTodo = _.findWhere(myTodos, {id: thisId});
  thisTodo.isComplete = !thisTodo.isComplete;
  // this is actually changing the value IN THE DB-THE ORIGINALsomething something by reference. something something by value... OBJECTS ARE BY REFERENCE. EVERYING ELSE IS BY VALUE...
  res.json(thisTodo);
});

router.post('/', function(req, res) {
  console.log(req.body);
  let thisTodo = {};
  thisTodo.id = parseInt(req.body.id);
  let lastTodoId = _.max(myTodos, function(obj){
    return obj.id;
  });
  thisTodo.id = lastTodoId.id + 1;
  thisTodo.description = (req.body.description).trim().substr(0, 30);
  thisTodo.isComplete = false;
  myTodos.push(thisTodo);
  res.json(thisTodo);
});

module.exports = router;
