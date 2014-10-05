var request = require('supertest');
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


describe('GET /users', function() {
    it('respond with json', function(done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /users', function() {
    it('respond with json', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('DELETE /users', function() {
    it('respond with json', function(done) {
        request(app)
            .delete('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('PUT /users', function() {
    it('respond with json', function(done) {
        request(app)
            .put('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
