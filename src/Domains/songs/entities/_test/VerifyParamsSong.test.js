const VerifyParamsSong = require('../VerifyParamsSong');

describe('VerifyParamsSong', () => {
  it('should throw error if params not containt needed property', () => {
    // Assert
    const params = {};
    // Action and Assert
    expect(() => new VerifyParamsSong(params)).toThrowError('VERIFY_PARAMS_SONG.NOT_CONTAINT_NEEDED_PROPERTY');
  });
  it('should throw error when params did not meet data type specification', () => {
    // Assert
    const params = {
      songId: 123,
    };
    // Action and Assert
    expect(() => new VerifyParamsSong(params)).toThrowError('VERIFY_PARAMS_SONG.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create VerifyParamsSong object correctly', () => {
    // Assert
    const params = {
      songId: 'song-0001',
    };
    // Action
    const result = new VerifyParamsSong(params);
    // Assert
    expect(result).toHaveProperty('id');
    expect(result.id).toEqual(params.songId);
  });
});
