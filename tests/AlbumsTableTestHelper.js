/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AlbumsTableTestHelper = {
  async addAlbum({
    id = 'album-0001',
    name = 'album',
    year = 2000,
  }) {
    const query = {
      text: `INSERT INTO albums
      VALUES($1, $2, $3)`,
      values: [id, name, year],
    };
    const { rows } = await pool.query(query);
    return rows;
  },

  async findAlbum(id) {
    const query = {
      text: `SELECT * FROM albums
      WHERE id = $1`,
      values: [id],
    };
    const { rows } = await pool.query(query);
    return rows;
  },

  async findAlbums() {
    const query = 'SELECT * FROM albums';
    const { rows } = await pool.query(query);
    return rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE table albums, songs');
  },
};

module.exports = AlbumsTableTestHelper;
