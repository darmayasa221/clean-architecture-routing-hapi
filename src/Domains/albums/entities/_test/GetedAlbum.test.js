const GetedAlbum = require('../GetedAlbum');

describe('GetedAlbum', () => {
  it('should throw error if payload did not containt needed property', () => {
    // Arrange
    const payload = {
      id: 'album-0001',
      name: 'album-test',
    };
    // Action and Assert
    expect(() => new GetedAlbum(payload)).toThrowError('GETED_ALBUM.NOT_CONATINT_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const paylod = {
      id: 123,
      name: 'album-test',
      year: 1234,
    };
    // Action and Assert
    expect(() => new GetedAlbum(paylod)).toThrowError('GETED_ALBUM.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create GetedAlbum object correctly', () => {
    // Arrange
    const payload = {
      id: 'album-0001',
      name: 'album-test',
      year: 1234,
    };
    // Action
    const {
      id,
      name,
      year,
    } = new GetedAlbum(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(name).toEqual(payload.name);
    expect(year).toEqual(payload.year);
  });
});
