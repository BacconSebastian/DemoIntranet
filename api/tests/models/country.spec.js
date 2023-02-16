const { Country, conn } = require('../../src/db.js')
const { expect } = require('chai')

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }))
  describe('Validators', () => {

    beforeEach(() => Country.sync({ force: true }))

    describe('params', () => {

      it('should throw an error if any param is null', (done) => {
        Country.create({name: 'Argentina'})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      })

      it('should work when have all params', () => {
        Country.create({
          id: 'ARG',
          name: 'Argentina',
          image: 'test',
          continent: 'Americas',
          capital: 'Buenos Aires',
          subregion: 'Sudamerica',
          area: 9999,
          population: 9999
        })
      })

    })
  })
})