class AddedSong {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      id,
    } = payload;
    this.id = id;
  }

  _verifyPayload({
    id,
  }) {
    if (!id) {
      throw new Error('ADDED_SONG.NOT_CONTAINT_NEEDED_PROPERTY');
    }
    if (typeof id !== 'string') {
      throw new Error('ADDED_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedSong;
