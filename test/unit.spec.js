var expect = require('chai').expect;
var Router = require('../router');
var express = require('express');
var app = express();

describe('Router', function() {

    it('is a function', function(done) {
        expect(Router).to.be.a('function');
        done();
    });

    it('can be extended', function(done) {
        expect(Router.extend).to.be.a('function');
        done();
    });

    it('can extended and get its own routes', function(done) {

        var HomeRouter = Router.extend({
            routes: {
                'home|post': 'post'
            }
        });

        var HomeRoute = new HomeRouter({
            app: app
        });

        expect(Object.keys(HomeRoute.routes)).to.contain('home|post');

        done();
    });


    it('can compute request handler for its own routes', function(done) {

        var HomeRouter = Router.extend({
            routes: {
                'home|post': 'post',
            },
            post: function(request, response) {
                console.log(request + ' : ' + respose);
            }
        });

        var HomeRoute = new HomeRouter({
            app: app
        });

        expect(Object.keys(HomeRoute.routes)).to.contain('home|post');
        expect(HomeRoute._get_handler('home|post')).to.be.a('function');

        done();
    });

    it('can extended and instantiated', function(done) {

        var HomeRouter = Router.extend({
            routes: {
                'home|post': 'post',
                'home|delete': 'delete',
                'home|put': 'put',
                'home|get': 'get'
            },
            post: function(request, response) {
                res.status(200).json({
                    name: 'tobi'
                });
            },
            'delete': function(request, response) {
                res.status(200).json({
                    name: 'tobi'
                });
            },
            put: function(request, response) {
                res.status(200).json({
                    name: 'tobi'
                });
            },
            'get': function(request, response) {
                res.status(200).json({
                    name: 'tobi'
                });
            }
        });

        var HomeRoute = new HomeRouter({
            app: app
        });

        expect(HomeRoute.app).to.equal(app);
        expect(HomeRoute._express_router).to.not.be.null;
        expect(HomeRoute.get).to.be.a('function');

        done();
    });
});
