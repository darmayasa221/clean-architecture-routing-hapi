class AddAlbum {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      name,
      year,
    } = payload;
    this.name = name;
    this.year = year;
  }

  _verifyPayload({
    name,
    year,
  }) {
    if (!name || !year) {
      throw new Error('ADD_ALBUM.NOT_CONTAINT_NEEDED_PROPERTY');
    }
    if (typeof name !== 'string' || typeof year !== 'number') {
      throw new Error('ADD_ALBUM.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = AddAlbum;
