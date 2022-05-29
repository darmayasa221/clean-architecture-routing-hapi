class GetedSong {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      id,
      title,
      year,
      genre,
      performer,
      duration,
      album_id,
    } = payload;
    this.id = id;
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.performer = performer;
    this.duration = duration;
    this.albumId = album_id;
  }

  _verifyPayload({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    album_id,
  }) {
    if (
      !id
      || !title
      || !year
      || !genre
      || !performer
      || !duration
      || !album_id
    ) {
      throw new Error('GETED_SONG.NOT_CONTAINT_NEEDED_PROPERTY');
    }
    if (
      typeof id !== 'string'
      || typeof title !== 'string'
      || typeof year !== 'number'
      || typeof genre !== 'string'
      || typeof performer !== 'string'
      || typeof duration !== 'number'
      || typeof album_id !== 'string'
    ) {
      throw new Error('GETED_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = GetedSong;
