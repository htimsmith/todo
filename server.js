var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextdId = 1;


// add middleware 
// json request comes in, then express will parse it
// and access it 

app.use(bodyParser.json());

app.get('/', function(req, res) {
	
    res.send('Todo API Root');
});


// GET /todos

app.get('/todos', function(req, res) {
    res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id:todoId});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}

});


// POST /todos
app.post('/todos', function(req, res) {
	var body =  _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();

	body.id = todoNextdId;
	todos.push(body);
	todoNextdId++;

	res.json(body);

});

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {

	var todoId = parseInt(req.params.id, 10);

	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (!matchedTodo) {
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}

});

app.put('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body =  _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).json();
	} 

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	} 

   if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
   		validAttributes.description = body.description;
   } else if (body.hasOwnProperty('description')) {
 		return res.status(400).send();
   }

   // objects in js passed by reference not value, so dont need to assign below
   // numbers and strings dont do this, only objects
   _.extend(matchedTodo, validAttributes);

   res.json(matchedTodo);
   
});

app.listen(PORT, function() {
	
    console.log('express listening on port ' + PORT);
});
