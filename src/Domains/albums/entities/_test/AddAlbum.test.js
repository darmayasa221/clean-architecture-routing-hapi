const AddAlbum = require('../AddAlbum');

describe('AddAlbum entities', () => {
  it('should throw error if payload did not containt needed property', () => {
    // Arrange
    const payload = {
      name: 'album-name',
    };
    // Action and Assert
    expect(() => new AddAlbum(payload)).toThrowError('ADD_ALBUM.NOT_CONTAINT_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 'album-name',
      year: '1234',
    };
    // Action and Assert
    expect(() => new AddAlbum(payload)).toThrowError('ADD_ALBUM.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create AddAlbum object correctly', () => {
    // Arrange
    const payload = {
      name: 'album-name',
      year: 1234,
    };
    // Action
    const {
      username,
      year,
    } = new AddAlbum(payload);
    // Assert
    expect(username).toEqual(payload.name);
    expect(year).toEqual(payload.year);
  });
});
