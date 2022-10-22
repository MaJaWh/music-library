const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../services/db');
const app = require('../app');

describe('create album', () => {
    let db;
    beforeEach(async () => (db = await getDb()));
  
    afterEach(async () => {
      await db.query('DELETE FROM Album');
      await db.end();
    });

    describe('/album', () => {
        describe('POST', () => {
            it('creates new album in the database', async () => {
                const res = await request(app).post('/album').send({
                    name: 'Innerspeaker',
                    year: 2010
                });

                expect(res.status).to.equal(201);

                const [[albumEntries]] = await db.query(
                    `SELECT * FROM Album WHERE name = 'Innerspeaker'`
                );

                expect(albumEntries.name).to.equal('Innerspeaker');
                expect(albumEntries.year).to.equal(2010);
                });  
            });
        });
    });   