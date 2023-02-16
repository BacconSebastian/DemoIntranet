const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);

describe('GET routes', () => {

  describe('GET /countries', () => {
    it('should get 200', () => {
      agent.get('/countries').expect(200)}
    )
  })

  describe('GET /activities', () => {
    it('should get 200', () => {
      agent.get('/activities').expect(200)
    })
  })
})