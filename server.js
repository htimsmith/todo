var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'go to market',
	completed: false
}, {
	id: 3,
	description: 'pick up cassie',
	completed: true
}];

app.get('/', function(req, res) {
	
    res.send('Todo API Root');
});


// GET /todos

app.get('/todos', function(req, res) {
    // converts our array into json
    res.json(todos);
});

// GET /todos/:id

app.get('/todos/:id', function(req, res) {
	res.json('asking for todo with id of ' + req.params.id);
});

app.listen(PORT, function() {
	
    console.log('express listening on port ' + PORT);
});