const AddedSong = require('../AddedSong');

describe('AddedSong', () => {
  it('should throw error if payload did not containt needed property', () => {
    // Arrange
    const payload = {};
    // Action and Assert
    expect(() => new AddedSong(payload)).toThrowError('ADDED_SONG.NOT_CONTAINT_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
    };
    // Action and Assert
    expect(() => new AddedSong(payload)).toThrowError('ADDED_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create AddedSong object correctly', () => {
    // Arrange
    const payload = {
      id: 'song-0001',
    };
    // Action
    const { id } = new AddedSong(payload);
    // Assert
    expect(id).toEqual(payload.id);
  });
});
