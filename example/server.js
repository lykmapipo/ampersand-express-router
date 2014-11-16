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
        'users|put': 'beforeEdit',
        'users|get': 'beforeAll',
        'users/:id|get': 'beforeShow'
    },

    // ------- ROUTE HANDLERS ---------
    create: function(request, response) {
        response.json(request.out);
    },
    destroy: function(request, response) {
        response.json(request.out);
    },
    edit: function(request, response) {
        response.json(request.out);
    },
    all: function(request, response) {
        response.json(request.out);
    },
    show: function(request, response) {
        response.json(request.out);
    },

    // ------- BEFORE FILTER HANDLERS ---------
    beforeCreate: function(request, response, next) {
        request.out = {
            name: 'before create'
        }
        next();
    },

    beforeDestroy: function(request, response, next) {
        request.out = {
            name: 'before destroy'
        }
        next();
    },

    beforeEdit: function(request, response, next) {
        request.out = {
            name: 'before edit'
        }
        next();
    },

    beforeAll: function(request, response, next) {
        request.out = {
            name: 'before all'
        }
        next();
    },

    beforeShow: function(request, response, next) {
        request.out = {
            name: 'before show'
        }
        next();
    }

});
var UsersRoute = new UserRouter({
    app: app
});
app.listen(3000);
console.log("app start");