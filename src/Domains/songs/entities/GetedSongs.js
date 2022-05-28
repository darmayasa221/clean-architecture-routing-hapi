class GetedSongs {
  constructor(payload) {
    this._verifyPayload(payload);
    this.songs = payload;
  }

  _verifyPayload(payload) {
    if (!Array.isArray(payload)) {
      throw new Error('GETED_SONGS.DATA_NOT_AN_ARRAY');
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const object of payload) {
      if (typeof object !== 'object') {
        throw new Error('GETED_SONGS.DATA_NOT_AN_OBJECT');
      }
      this._verifyObject(object);
    }
  }

  _verifyObject({
    id,
    title,
    performer,
  }) {
    if (
      !id
      || !title
      || !performer
    ) {
      throw new Error('GETED_SONGS.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (
      typeof id !== 'string'
      || typeof title !== 'string'
      || typeof performer !== 'string'
    ) {
      throw new Error('GETED_SONGS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = GetedSongs;
