const SongRepository = require('../../../Domains/songs/SongRepository');
const AddSong = require('../../../Domains/songs/entities/AddSong');
const AddedSong = require('../../../Domains/songs/entities/AddedSong');
const GetedSong = require('../../../Domains/songs/entities/GetedSong');
const GetedSongs = require('../../../Domains/songs/entities/GetedSongs');
const VerifyParamsSong = require('../../../Domains/songs/entities/VerifyParamsSong');
const SongUseCase = require('../SongUseCase');

describe('SongUseCase', () => {
  describe('addSong', () => {
    it('should orchestrating the AddSong', async () => {
      // Arrange
      const useCasePayload = {
        title: 'title-test',
        year: 2000,
        genre: 'genre-test',
        performer: 'performer-test',
        duration: 201,
        albumId: 'album-0001',
      };
      const expectedAddedSong = new AddedSong({
        id: 'song-0001',
      });
      const mockSongRepository = new SongRepository();
      /** mocking needed function */
      mockSongRepository.addSong = jest.fn()
        .mockImplementation(() => Promise.resolve(new AddedSong({
          id: 'song-0001',
        })));
      /** creating use case instance */
      const songUseCase = new SongUseCase({
        songRepository: mockSongRepository,
      });
      // Action
      const addedSong = await songUseCase.addSong(useCasePayload);
      // Assert
      expect(mockSongRepository.addSong).toBeCalledWith(new AddSong({
        title: useCasePayload.title,
        year: useCasePayload.year,
        genre: useCasePayload.genre,
        performer: useCasePayload.performer,
        duration: useCasePayload.duration,
        albumId: useCasePayload.albumId,
      }));
      expect(addedSong).toStrictEqual(expectedAddedSong);
    });
  });
  describe('getSongs', () => {
    it('should orchestrating the getSongs correctly', async () => {
      // Arrange
      const expectedSongsGet = new GetedSongs([{
        id: 'song-0001',
        title: 'title-test',
        performer: 'performer-test',
      }]);
      const mockSongRepository = new SongRepository();
      /** mocking needed function */
      mockSongRepository.getSongs = jest.fn()
        .mockImplementation(() => Promise.resolve(new GetedSongs([{
          id: 'song-0001',
          title: 'title-test',
          performer: 'performer-test',
        }])));
      /** create use case instance */
      const songUseCase = new SongUseCase({
        songRepository: mockSongRepository,
      });
      // Action
      const songs = await songUseCase.getSongs();
      // Asserts
      expect(mockSongRepository.getSongs).toBeCalled();
      expect(songs).toHaveLength(1);
      expect(songs).toStrictEqual(expectedSongsGet);
    });
  });
  describe('getSongById', () => {
    it('should orchestrating the getSongById correctly', async () => {
      // Arrange
      const useCasePayload = {
        songId: 'song-0001',
      };
      const verifiedUseCasePayload = new VerifyParamsSong({
        songId: useCasePayload.songId,
      });
      const expectedSong = new GetedSong({
        id: useCasePayload.songId,
        title: 'title-test',
        year: 2000,
        genre: 'genre-test',
        performer: 'performer-test',
        duration: 201,
        albumId: 'album-0001',
      });
      const mockSongRepository = new SongRepository();
      /** mocking needed functiong */
      mockSongRepository.checkAvailableSongId = jest.fn()
        .mockImplementation(() => Promise.resolve(new GetedSong({
          songId: useCasePayload.songId,
        })));
      mockSongRepository.getSongById = jest.fn()
        .mockImplementation(() => Promise.resolve(new GetedSong({
          id: useCasePayload.songId,
          title: 'title-test',
          year: 2000,
          genre: 'genre-test',
          performer: 'performer-test',
          duration: 201,
          albumId: 'album-0001',
        })));
      /** create use case instance */
      const songUseCase = new SongUseCase({
        songRepository: mockSongRepository,
      });
      // Action
      const song = await songUseCase.getSongById(useCasePayload);
      // Assert
      expect(verifiedUseCasePayload).toHaveProperty('id');
      expect(verifiedUseCasePayload.id).toEqual(useCasePayload.songId);
      expect(mockSongRepository.checkAvailableSongId).toBeCalledWith(useCasePayload.songId);
      expect(mockSongRepository.getSongById).toBeCalledWith(new VerifyParamsSong({
        id: useCasePayload.songId,
      }));
      expect(song).toStrictEqual(expectedSong);
    });
  });
  describe('editSongById', () => {
    it('should orchestrating the editSongById correctly', async () => {
      // Arrange
      const useCasePayload = {
        songId: 'song-0001',
        title: 'title-test',
        year: 2000,
        genre: 'genre-test',
        performer: 'performer-test',
        duration: 201,
        albumId: 'album-0001',
      };
      const verifiedParmasSongId = new VerifyParamsSong({
        songId: useCasePayload.songId,
      });
      const mockSongRepository = new SongRepository();
      /** mocking needed function */
      mockSongRepository.checkAvailableSongId = jest.fn()
        .mockImplementation(() => Promise.resolve());
      mockSongRepository.editSongById = jest.fn()
        .mockImplementation(() => Promise.resolve());
      /** create use case instance */
      const songUseCase = new SongUseCase({
        songRepository: mockSongRepository,
      });
      // Action
      await songUseCase.editSongById(useCasePayload);
      // Assert
      expect(verifiedParmasSongId).toHaveProperty('id');
      expect(verifiedParmasSongId.id).toEqual(useCasePayload.songId);
      expect(mockSongRepository.checkAvailableSongId).toBeCalledWith(new VerifyParamsSong({
        songId: useCasePayload.songId,
      }));
      expect(mockSongRepository.editSongById).toBeCalledWith({
        ...new VerifyParamsSong({
          songId: useCasePayload.songId,
        }),
        ...new AddSong({
          title: useCasePayload.title,
          year: useCasePayload.year,
          genre: useCasePayload.genre,
          performer: useCasePayload.performer,
          duration: useCasePayload.duration,
          albumId: useCasePayload.albumId,
        }),
      });
    });
  });
  describe('deleteSongById', () => {
    it('should orchestrating the deleteSongById correctly', async () => {
      // Arrange
      const useCasePayload = {
        songId: 'song-0001',
      };
      const verifiedParmasSongId = new VerifyParamsSong({
        songId: useCasePayload.songId,
      });
      const mockSongRepository = new SongRepository();
      /** mocking  needed function */
      mockSongRepository.checkAvailableSongId = jest.fn()
        .mockImplementation(() => Promise.resolve());
      mockSongRepository.deleteSongById = jest.fn()
        .mockImplementation(() => Promise.resolve());
      /** create use case instance */
      const songUseCase = new SongUseCase({
        songRepository: mockSongRepository,
      });
      // Action
      await songUseCase.deleteSongById(useCasePayload);
      // Assert
      expect(verifiedParmasSongId).toHaveProperty('id');
      expect(verifiedParmasSongId.id).toEqual(useCasePayload.songId);
      expect(mockSongRepository.checkAvailableSongId).toBeCalledWith(new VerifyParamsSong({
        songId: useCasePayload.songId,
      }));
      expect(mockSongRepository.deleteSongById).toBeCalledWith(new VerifyParamsSong({
        songId: useCasePayload.songId,
      }));
    });
  });
});
