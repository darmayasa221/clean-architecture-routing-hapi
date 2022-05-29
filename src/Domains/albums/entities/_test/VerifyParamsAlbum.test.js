const VerifyParamsAlbum = require('../VerifyParamsAlbum');

describe('VerifyParamsAlbum', () => {
  it('should throw error if params not containt needed property', () => {
    // Arrange
    const params = {};
    // Action and Assert
    expect(() => new VerifyParamsAlbum(params)).toThrowError('VERIFY_PARAMS_ALBUM.NOT_CONTAINT_NEEDED_PROPERTY');
  });
  it('should throw error when params not meet data type specification', () => {
    // Arrange
    const params = {
      albumId: 123,
    };
    // Action and Assert
    expect(() => new VerifyParamsAlbum(params)).toThrowError('VERIFY_PARAMS_ALBUM.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create VerifyParamsAlbum object correctly', () => {
    // Arrange
    const params = {
      albumId: 'album-0001',
    };
    // Action
    const result = new VerifyParamsAlbum(params);
    // Assert
    expect(result).toHaveProperty('id');
    expect(result.id).toEqual(params.albumId);
  });
});
