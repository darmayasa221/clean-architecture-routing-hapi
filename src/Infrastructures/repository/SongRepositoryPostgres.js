const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const SongRepository = require('../../Domains/songs/SongRepository');

class SongRepositoryPostgres extends SongRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addSong({
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  }) {
    const id = `song-${this._idGenerator()}`;
    const query = {
      text: `INSERT INTO songs
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`,
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async getSongs() {
    const query = 'SELECT id, title, performer FROM songs';
    const { rows } = await this._pool.query(query);
    return rows;
  }

  async getSongById({ id }) {
    const query = {
      text: `SELECT * FROM songs
      WHERE id = $1`,
      values: [id],
    };
    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async editSongById({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  }) {
    const query = {
      text: `UPDATE songs
      SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6
      WHERE id = $7`,
      values: [title, year, genre, performer, duration, albumId, id],
    };
    await this._pool.query(query);
  }

  async deleteSongById({ id }) {
    const query = {
      text: `DELETE FROM songs
      WHERE id = $1`,
      values: [id],
    };
    await this._pool.query(query);
  }

  async checkAvailableSongId({ id }) {
    const query = {
      text: `SELECT id FROM songs
      WHERE id = $1`,
      values: [id],
    };
    const { rowCount } = await this._pool.query(query);
    if (!rowCount) {
      throw new NotFoundError('not found the songId');
    }
  }
}

module.exports = SongRepositoryPostgres;
