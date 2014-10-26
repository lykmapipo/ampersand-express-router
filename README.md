# ampersand-express-router

Serverside backbone router for express 4. Mostly lifted from [Backbone.js](http://backbonejs.org/#Router).

Part of the [Ampersand.js toolkit](http://ampersandjs.com) for building severside applications.

## install

```
npm install ampersand-express-router
```

## example

```javascript
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
    }

    ...
});

var UsersRoute = new UserRouter({
    app: app
});

app.listen(3000);
```

## API Reference

### extend `Router.extend(properties)`

Get started by creating a custom router class. Define actions that are triggered when certain URL are matched, and provide a routes hash that pairs routes to actions. Note that you'll want to avoid using a leading slash in your route definitions:

```javascript
var UserRouter = Router.extend({

  routes: {
    "users|get":                 "all",    // /users
    "users/:id|get":        "show",  // /users/11
  },

  all: function(request,response,next) {
    //...
  },

  show: function(request,response,next) {
    //...
  }

});
```

### routers `router.routes`

The routes hash maps URLs with parameters to functions on your router. Routes can contain path parameter parts, `:param`.


### constructor / initialize `new Router([options])`

When creating a new router, you must pass an instance of express application which this router will be mounted into and additional express router options.

## credits

All credit goes to Jeremy Ashkenas and the rest of the Backbone.js authors.

## license

MIT