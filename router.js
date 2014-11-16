var class_extend = require('ampersand-class-extend');
var _ = require('underscore');
var express = require('express');

/**
 * @module Router
 * @version 0.0.1
 * @requires module:express
 * @requires module:underscore
 * @requires module:ampersand-class-extend
 * @param  {Object} options options to be passed into the router
 *
 * Options is an optional object to alter the behavior of the router.
 *
 * app - an instance of express application
 *
 * caseSensitive - Enable case sensitivity, disabled by default,
 *                 treating "/Foo" and "/foo" as the same
 *
 * strict - Enable strict routing, by default "/foo" and "/foo/"
 *          are treated the same by the router
 *
 * mergeParams - Ensure the req.params values from the parent router are preserved.
 *               If the parent and the child have conflicting param names,
 *               the child's value take precedence. Defaults to false.
 *
 */
var Router = module.exports = function(options) {
    options || (options = {});

    if (options.app) {
        this.app = options.app;
    }

    //internal express router for this router 
    this._express_router = express.Router({
        caseSensitive: options.caseSensitive || false,
        strict: options.strict || false,
        mergeParams: options.mergeParams || false
    });

    //call initialize logic
    this.initialize.apply(this, arguments);

    //bind before filters
    this._bind_before_filters();

    //bind routes to this router
    this._bind_routes();

    //mount to express app
    this.app.use(this._express_router);
};

// Set up all inheritable **Backbone.Router** properties and methods.
_.extend(Router.prototype, {

    /**
     * @function
     *
     * Initialize is an empty function by default.
     * Override it with your own initialization logic.
     */
    initialize: function() {},

    /**
     * @function
     *
     * compute a request handler function for the specified route
     * @param  {String} route a route to lookup its request handler
     * @return {Function}       a request handler
     */
    _get_handler: function(route) {
        var handle = this.routes[route];
        return this[handle];
    },


    /**
     * @function
     *
     * compute a request filter function for the specified route
     * @param  {String} filter a filter to lookup its request filter
     * @return {Function}       a request filter
     */
    _get_filter: function(filter) {
        var filter = this.before_filters[filter];
        return this[filter];
    },

    /**
     * @function
     *
     * Bind all defined routes to express router.
     */
    _bind_routes: function() {
        if (!this.routes) {
            throw Error("No routes specified for this router ");
        }

        if (!this.app) {
            throw Error("No express application specified to bind this router");
        }

        this.routes = _.result(this, 'routes');

        var self = this;

        Object.keys(this.routes).forEach(function eachRoute(route) {

            var method = route.split('|')[1] || 'get';
            var url = route.split('|')[0];

            self._express_router[method]('/' + url, function(request, response, next) {
                self._get_handler(route)(request, response, next);
            });
        });
    },

    /**
     * @function
     *
     * bind request before filters
     */
    _bind_before_filters: function() {
        this.before_filters = _.result(this, 'before_filters');

        if (this.before_filters) {
            var self = this;

            Object.keys(this.before_filters).forEach(function beforeFilter(beforeFilter) {
                // this will only be invoked if the path starts with /bar from the mount point
                var method = route.split('|')[1] || 'get';
                var url = route.split('|')[0];

                self._express_router[method]('/' + url, function(req, res, next) {
                    self._get_filter(beforeFilter)(request, response, next);
                });
            });
        }
    }

});
/**
 * @function
 *
 * Expose extend for this router
 */
Router.extend = class_extend;