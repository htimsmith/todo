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


app.post('/todos', function(req, res) {
	var body = req.body;

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.id = todoNextdId;
	todos.push(body);
	todoNextdId++;

	console.log('dump array');
	console.log(todos);

	res.json(body);

});

app.listen(PORT, function() {
	
    console.log('express listening on port ' + PORT);
});