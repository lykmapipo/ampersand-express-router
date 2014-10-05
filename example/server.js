var Router = require('ampersand-express-router');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

var UserRouter = Router.extend({
    routes: {
        'users|post': 'create',
        'users|delete': 'destroy',
        'users|put': 'edit',
        'users|get': 'all',
        'users/:id|get': 'show'
    },
    create: function(request, response) {
        response.json({
            name: 'create'
        });
    },
    destroy: function(request, response) {
        response.json({
            name: 'destroy'
        });
    },
    edit: function(request, response) {
        response.json({
            name: 'edit'
        });
    },
    all: function(request, response) {
        response.json({
            name: 'all'
        });
    },
    show: function(request, response) {
        response.json({
            name: request.param('id')
        });
    }
});

var UsersRoute = new UserRouter({
    app: app
});

app.listen(3000);
