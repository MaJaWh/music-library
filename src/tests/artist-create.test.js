const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../services/db');
const app = require('../app');

describe('create artist', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query('DELETE FROM Artist');
    await db.end();
  });

  describe('/artist', () => {
    describe('POST', () => {
      it('creates a new artist in the database', async () => {
        const res = await request(app).post('/artist').send({
          name: 'Tame Impala',
          genre: 'rock',
        });

        expect(res.status).to.equal(201);

        const [[artistEntries]] = await db.query(
          `SELECT * FROM Artist WHERE name = 'Tame Impala'`
        );

        expect(artistEntries.name).to.equal('Tame Impala');
        expect(artistEntries.genre).to.equal('rock');
      });
    });
  });
});
