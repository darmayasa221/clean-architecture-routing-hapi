const AddSong = require('../AddSong');

describe('AddSong', () => {
  it('should throw error if payload did not containt needed property', () => {
    // Arrange
    const payload = {
      year: 1234,
      genre: 'genre-test',
      performer: 'performer-test',
      duration: 301,
      albumId: 'album-0001',
    };
    // Action and Assert
    expect(() => new AddSong(payload)).toThrowError('ADD_SONG.NOT_CONTAINT_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      year: 1234,
      genre: 'genre-test',
      performer: 'performer-test',
      duration: 301,
      albumId: 'album-0001',
    };
    // Action and Assert
    expect(() => new AddSong(payload)).toThrowError('ADD_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create AddSong object correctly', () => {
    // Arrange
    const payload = {
      title: 'title-test',
      year: 1234,
      genre: 'genre-test',
      performer: 'performer-test',
      duration: 301,
      albumId: 'album-0001',
    };
    // Action
    const {
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    } = new AddSong(payload);
    // Assert
    expect(title).toEqual(payload.title);
    expect(year).toEqual(payload.year);
    expect(genre).toEqual(payload.genre);
    expect(performer).toEqual(payload.performer);
    expect(duration).toEqual(payload.duration);
    expect(albumId).toEqual(payload.albumId);
  });
});
