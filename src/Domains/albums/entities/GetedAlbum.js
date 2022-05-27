class GetedAlbum {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      id,
      name,
      year,
    } = payload;
    this.id = id;
    this.name = name;
    this.year = year;
  }

  _verifyPayload({
    id,
    name,
    year,
  }) {
    if (
      !id
      || !name
      || !year
    ) {
      throw new Error('GETED_ALBUM.NOT_CONATINT_NEEDED_PROPERTY');
    }
    if (
      typeof id !== 'string'
      || typeof name !== 'string'
      || typeof year !== 'number'
    ) {
      throw new Error('GETED_ALBUM.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetedAlbum;
