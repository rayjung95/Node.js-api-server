var request = require('supertest')
var app = require('../app')

describe('Index', function () {
  it('is the root path', function (done) {
    request(app).get('/')
      .expect(200, done)
  })
})
