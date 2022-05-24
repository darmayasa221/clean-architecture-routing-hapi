const GetedSong = require('../GetedSong');

describe('GetedSong', () => {
  it('should throw if payload did not conatint needed property', () => {
    // Arrange
    const payload = {
      title: 'title-test',
      year: 2008,
      performer: 'performer-test',
      genre: 'genre-test',
      duration: 120,
      album_id: 'album-0001',
    };
    // Action and Assert
    expect(() => new GetedSong(payload)).toThrowError('GETED_SONG.NOT_CONTAINT_NEEDED_PROPERTY');
  });
  it('should throw error when did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'title-test',
      year: '2008',
      performer: 'performer-test',
      genre: 'genre-test',
      duration: '120',
      album_id: 'album-0001',
    };
    // Action and Assert
    expect(() => new GetedSong(payload)).toThrowError('GETED_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create GetedSong object correctly', () => {
    // Arrange
    const payload = {
      id: 'song-0001',
      title: 'title-test',
      year: 2008,
      performer: 'performer-test',
      genre: 'genre-test',
      duration: 120,
      album_id: 'album-0001',
    };
    // Action
    const {
      id,
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
    } = new GetedSong(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(year).toEqual(payload.year);
    expect(performer).toEqual(payload.performer);
    expect(genre).toEqual(payload.genre);
    expect(duration).toEqual(payload.duration);
    expect(albumId).toEqual(payload.album_id);
  });
});
