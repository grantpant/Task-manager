var test = require('supertest'), // Assertions library
    path = require('path'),
    app  = require('../app');

describe('GET items test', function(){

    it('1.1 Should return 200 status for /todos - HAPPY PATH', function(done){
        test(app)
            .get('/todos')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('1.2 Should return a single to do when an id is provided - HAPPY PATH', function(done){
        // fill the code needed to test a single todo route
        // how to test a single todo?
        // it has to have an id that exists
        test(app)
        .get('/todos/1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('1.3 Should return a 404 not found if an unknown id is provided on a GET', function(done){
        test(app)
        .get('/todos/99')
        .expect(404, done);
    });

    it('2.1 should return 201 for successul post', function(done) {
        test(app)
        .post('/todos/')
        .send({
            "description": "get sum"
        })
        .expect(/get sum/i)
        .expect(201, done); // i= regex expression to ignore the case of the string that comes back
    });

    it('3.1 should return successful for put', function(done) {
        var isComplete;
        test(app)
        .post('/todos/')
        .send({
            "description": "do sumthin"
        })
        .expect(200)
        .end(function(err,res) {
            let insertedId = parseInt(res.body.id);
            test(app)
            .put('/todos/' + insertedId)
            .expected(200, {
                'id': insertedId,
                'description': !res.isComplete
            }, done);
        });
    });
});