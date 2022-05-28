class AddSong {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    } = payload;
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.performer = performer;
    this.duration = duration;
    this.albumId = albumId;
  }

  _verifyPayload({
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  }) {
    if (
      !title
      || !year
      || !genre
      || !performer
      || !duration
      || !albumId
    ) {
      throw new Error('ADD_SONG.NOT_CONTAINT_NEEDED_PROPERTY');
    }
    if (
      typeof title !== 'string'
      || typeof year !== 'number'
      || typeof genre !== 'string'
      || typeof performer !== 'string'
      || typeof duration !== 'number'
      || typeof albumId !== 'string'
    ) {
      throw new Error('ADD_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddSong;
