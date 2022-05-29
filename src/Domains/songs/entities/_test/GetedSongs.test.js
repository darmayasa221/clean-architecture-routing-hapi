const GetedSongs = require('../GetedSongs');

describe('GetedSongs', () => {
  describe('verifyPayload', () => {
    it('should throw error if payload did not data type of Array', () => {
    // Arrange
      const payload = {};
      // Action and Assert
      expect(() => new GetedSongs(payload)).toThrowError('GETED_SONGS.DATA_NOT_AN_ARRAY');
    });
    it('should throw error if in array not meet data type of an object', () => {
    // Arrange
      const payload = ['string'];
      // Action and Assert
      expect(() => new GetedSongs(payload)).toThrowError('GETED_SONGS.DATA_NOT_AN_OBJECT');
    });
  });
  describe('verifyObject', () => {
    it('should throw error if data at object not contain needed property', () => {
    // Arrange
      const payload = [
        {
          title: 'title-test',
          performer: 'performer-test',
        },
      ];
      // Action and Assert
      expect(() => new GetedSongs(payload)).toThrowError('GETED_SONGS.NOT_CONTAIN_NEEDED_PROPERTY');
    });
    it('should throw error when data at object not meet data type specification', () => {
      // Arrange
      const payload = [
        {
          id: 123,
          title: 'title-test',
          performer: 'performer-test',
        },
      ];
      // Action and Assert
      expect(() => new GetedSongs(payload)).toThrowError('GETED_SONGS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
  });
  it('should create GetedSongs object correctly', () => {
    // Arrange
    const payload = [
      {
        id: 'song-0001',
        title: 'title-test',
        performer: 'performer-test',
      },
    ];
    // Action
    const { songs } = new GetedSongs(payload);
    // Assert
    expect(Array.isArray(songs)).toBeTruthy();
    expect(songs).toHaveLength(1);
    expect(songs[0].id).toEqual(payload[0].id);
    expect(songs[0].title).toEqual(payload[0].title);
    expect(songs[0].performer).toEqual(payload[0].performer);
  });
});
