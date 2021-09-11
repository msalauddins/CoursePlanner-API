var chai = require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should()
let app = require("../index")

//Delay for mongoose connection message showing in right place
before(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});
//------------------------------ (End Header) ------------------------------

describe('\n Testing CoursePlanner API', function(){

  it('Connection Status Test', function(done){
    chai
    chai.request('http://localhost:3000')
    .get("/status")
      .end(function(err,res){
        res.should.have.status(200)
        done()
      })
  })

  it('Check Area API', function(done){
    chai
    chai.request('http://localhost:3000')
    .get("/areas")
      .end(function(err,res){
        res.should.have.status(200)
        done()
      })
  })

  it('Check Course API', function(done){
    chai
    chai.request('http://localhost:3000')
    .get("/courses")
      .end(function(err,res){
        res.should.have.status(200)
        done()
      })
  })

  it('Check User API', function(done){
    chai
    chai.request('http://localhost:3000')
    .get("/users")
      .end(function(err,res){
        res.should.have.status(200)
        done()
      })
  })

  it('Search Area BD001', function(done){
    chai
    chai.request('http://localhost:3000')
    .get("/find/areas")
    .send({ area_id: 'BD001'})
      .end(function(err,res){
        res.should.have.status(200)
        done()
      })
  })
})
//------------------------------ (End CoursePlanner API test) ------------------------------

  describe('Testing CoursePlanner User DB', function(){

  it('User Resigtration Test', function(done){
    chai
    chai.request('http://localhost:3000')
    .post("/new/user/dialog")
    .send({ name: 'Test User',
            email: 'test@mocha.com',
            uid: 'test',
            pass: '123'
          })
      .end(function(err,res){
        res.should.have.status(201)
        done()
      })
  })

  it('User Login Test', function(done){
    chai
    chai.request('http://localhost:3000')
    .post("/log-in")
    .send({ uid: 'test',
            pass: '123'
          })
      .end(function(err,res){
        res.should.have.status(200)
        done()
      })
  })

  it('Delete User', function(done){
    chai
    chai.request('http://localhost:3000')
    .delete("/delete/user/:uid")
    .send({ uid: 'test'
          })
      .end(function(err,res){
        res.should.have.status(200)
        done()
      })
  })
})
//------------------------------ (END User DB Operations test) ------------------------------