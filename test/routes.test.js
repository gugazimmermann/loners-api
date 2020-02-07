/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { createServer, startServer } = require('../src/server');
const initDb = require('../src/database');

require('dotenv').config();

const { expect } = chai;
chai.use(chaiHttp);

const host = '0.0.0.0';
const db = 'testDB';
const port = '3000';

const eventTest = {
  name: faker.random.word(),
  image: faker.random.image(),
  label: 'test event',
  date: faker.date.future(),
  duration: faker.random.number(),
  description: faker.random.words(),
  price: faker.finance.amount(),
  featured: faker.random.boolean(),
};

describe('Loners App Routes', () => {
  before(async () => {
    const server = await createServer();
    await startServer(server);
    await initDb(host, db);
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });


  describe('Loners App Routes', () => {
    describe('hello-world', () => {
      it('Should exist', async () => {
        const res = await chai.request(`http://${host}:${port}`).get('/helloWorld');
        expect(res.statusCode).to.be.eql(200);
        expect(res.text).to.be.eql('Hello, world!');
      });
    });

    describe('events', () => {
      it('GET', async () => {
        const get = await chai.request(`http://${host}:${port}`).get('/events');
        expect(get.statusCode).to.be.eql(200);
        expect(get.body.data).to.be.an('array');
        expect(get.body.data).to.be.empty;
        const post1 = await chai.request(`http://${host}:${port}`).post('/events').send(eventTest);
        expect(post1.statusCode).to.be.eql(200);
        const post2 = await chai.request(`http://${host}:${port}`).post('/events').send({ ...eventTest, name: 'teste' });
        expect(post2.statusCode).to.be.eql(200);
        const getAll = await chai.request(`http://${host}:${port}`).get('/events');
        expect(getAll.statusCode).to.be.eql(200);
        expect(getAll.body.data).to.be.an('array').to.have.length(2);
      });

      it('POST', async () => {
        const post = await chai.request(`http://${host}:${port}`).post('/events').send(eventTest);
        expect(post.statusCode).to.be.eql(200);
        expect(post.body.data.label).to.be.equal('test event');
        const post2 = await chai.request(`http://${host}:${port}`).post('/events').send({ ...eventTest, price: -1 });
        expect(post2.statusCode).to.be.eql(400);
        expect(post2.text).to.be.equal('{"statusCode":400,"error":"Bad Request","message":"Event cannot be created"}');
      });

      it('DELETE', async () => {
        const post = await chai.request(`http://${host}:${port}`).post('/events').send(eventTest);
        expect(post.statusCode).to.be.eql(200);
        const del = await chai.request(`http://${host}:${port}`).delete(`/events/${post.body.data.id}`);
        expect(del.statusCode).to.be.eql(200);
        const get = await chai.request(`http://${host}:${port}`).get(`/events/${post.body.data.id}`);
        expect(get.statusCode).to.be.eql(404);
        expect(get.text).to.be.eql(`{"statusCode":404,"error":"Not Found","message":"Event with ID: ${post.body.data.id} not found"}`);
        const del2 = await chai.request(`http://${host}:${port}`).delete(`/events/${post.body.data.id}`);
        expect(del2.statusCode).to.be.eql(404);
        expect(del2.text).to.be.eql(`{"statusCode":404,"error":"Not Found","message":"Event with ID: ${post.body.data.id} not found"}`);
      });

      it('GET ONE', async () => {
        const post = await chai.request(`http://${host}:${port}`).post('/events').send(eventTest);
        const get = await chai.request(`http://${host}:${port}`).get(`/events/${post.body.data.id}`);
        expect(get.statusCode).to.eql(200);
        expect(get.body.data.label).to.be.eql('test event');
      });

      it('UPDATE', async () => {
        const post = await chai.request(`http://${host}:${port}`).post('/events').send(eventTest);
        const update = await chai.request(`http://${host}:${port}`).put(`/events/${post.body.data.id}`).send({ name: 'test update' });
        expect(update.statusCode).to.eql(200);
        expect(update.body.data.name).to.be.eql('test update');
        const update2 = await chai.request(`http://${host}:${port}`).put('/events/123').send({ name: 'test update' });
        expect(update2.statusCode).to.be.eql(404);
        expect(update2.text).to.be.eql('{"statusCode":404,"error":"Not Found","message":"Event with ID: 123 not found"}');
      });
    });
  });
});
