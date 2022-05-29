/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const SongsTableTestHelper = {
  async addSong({
    id = 'song-0001',
    title = 'song-test',
    year = 1000,
    genre = 'genre-test',
    performer = 'perofrmer-test',
    duration = 120,
    album_id = 'album-0001',
  }) {
    const query = {
      text: `INSERT INTO songs
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
      values: [id, title, year, genre, performer, duration, album_id],
    };
    const { rows } = await pool.query(query);
    return rows;
  },
  async findSong(id) {
    const query = {
      text: `SELECT * FROM songs
      WHERE id = $1`,
      values: [id],
    };

    const { rows } = await pool.query(query);
    return rows;
  },

  async findSongs() {
    const query = 'SELECT * FROM songs';

    const { rows } = await pool.query(query);
    return rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE table albums, songs');
  },
};

module.exports = SongsTableTestHelper;
