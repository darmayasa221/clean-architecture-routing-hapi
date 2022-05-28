const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AlbumRepository = require('../../Domains/albums/AlbumRepository');

class AlbumRepositoryPostgres extends AlbumRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addAlbum({
    name,
    year,
  }) {
    const id = `album-${this._idGenerator()}`;
    const query = {
      text: `INSERT INTO albums
      VALUES($1, $2, $3) RETURNING id`,
      values: [id, name, year],
    };
    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async getAlbumById({ id }) {
    const query = {
      text: `SELECT * FROM albums
      WHERE id = $1`,
      values: [id],
    };
    const { rows } = await this._pool.query(query);
    return rows;
  }

  async editAlbumById({
    id,
    name,
    year,
  }) {
    const query = {
      text: `UPDATE albums
      SET name = $1, year = $2
      WHERE id = $3`,
      values: [name, year, id],
    };

    await this._pool.query(query);
  }

  async deleteAlbumById({ id }) {
    const query = {
      text: `DELETE FROM albums 
      WHERE id = $1`,
      values: [id],
    };
    await this._pool.query(query);
  }

  async checkAvailableAlbumId({ id }) {
    const query = {
      text: `SELECT id FROM albums
      WHERE id = $1`,
      values: [id],
    };

    const { rowCount } = await this._pool.query(query);
    if (!rowCount) {
      throw new NotFoundError('not found the albumId');
    }
  }
}

module.exports = AlbumRepositoryPostgres;
