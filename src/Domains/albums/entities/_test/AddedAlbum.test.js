const AddedAlbum = require('../AddedAlbum');

describe('AddedAlbum', () => {
  it('should throw error if payload did not containt needed property', () => {
    // Arrange
    const payload = {};
    // Acction and Assert
    expect(() => new AddedAlbum(payload)).toThrowError('ADDED_ALBUM.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
    };
    // Action and Assert
    expect(() => new AddedAlbum(payload)).toThrowError('ADDED_ALBUM.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create AddedAlbum object correctly', () => {
    // Arrange
    const payload = {
      id: 'album-0001',
    };
    // Action
    const { id } = new AddedAlbum(payload);
    // Assert
    expect(id).toEqual(payload.id);
  });
});
