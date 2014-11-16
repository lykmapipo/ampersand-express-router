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
    // ------- ROUTES DEFINITIONS ---------
    routes: {
        'users|post': 'create',
        'users|delete': 'destroy',
        'users|put': 'edit',
        'users|get': 'all',
        'users/:id|get': 'show'
    },

    // ------- BEFORE FILTERS DEFINITIONS ---------
    before_filters: {
        'users|post': 'beforeCreate',
        'users|delete': 'beforeDestroy',
        'users|put': ['beforeEdit']
        'users|get': 'beforeAll',
        'users/:id|get': 'beforeShow'
    },

    // ------- ROUTE HANDLERS ---------
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
    },

    // ------- BEFORE FILTER HANDLERS ---------
    beforeCreate: function(request, response, next) {
        next();
    },

    beforeDestroy: function(request, response, next) {
        next();
    },

    beforeEdit: function(request, response, next) {
        next();
    },

    beforeAll: function(request, response, next) {
        next();
    },

    beforeShow: function(request, response, next) {
        next();
    }

});
var UsersRoute = new UserRouter({
    app: app
});
app.listen(3000);