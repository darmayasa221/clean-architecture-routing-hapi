const pool = require('../../database/postgres/pool');
const SongsTableTestHelper = require('../../../../tests/SongsTableTestHelper');
const SongRepositoryPostgres = require('../SongRepositoryPostgres');
const AddSong = require('../../../Domains/songs/entities/AddSong');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AlbumsTableTestHelper = require('../../../../tests/AlbumsTableTestHelper');

describe('SongRepositoryPostgres', () => {
  afterAll(async () => {
    await pool.end();
  });
  afterEach(async () => {
    await SongsTableTestHelper.cleanTable();
  });
  describe('addSong', () => {
    it('should persist addSong', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-0001' });
      const addSong = new AddSong({
        title: 'title-test',
        year: 1234,
        genre: 'genre-test',
        performer: 'performer-test',
        duration: 301,
        albumId: 'album-0001',
      });
      const fakeIdGenerator = () => '0001';
      const songRepositoryPostgres = new SongRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      await songRepositoryPostgres.addSong(addSong);
      // Assert
      const song = await SongsTableTestHelper.findSong('song-0001');
      expect(song).toHaveLength(1);
    });
    it('should return addSong correctly', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-0001' });
      const addSong = new AddSong({
        title: 'title-test',
        year: 1234,
        genre: 'genre-test',
        performer: 'performer-test',
        duration: 301,
        albumId: 'album-0001',
      });
      const fakeIdGenerator = () => '0001';
      const songRepositoryPostgres = new SongRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      const song = await songRepositoryPostgres.addSong(addSong);
      // Assert
      expect(song).toHaveProperty('id');
      expect(song.id).toEqual('song-0001');
    });
  });
  describe('getSongs', () => {
    it('should retrun songs correctly', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-0001' });
      await SongsTableTestHelper.addSong({ id: 'song-0001' });
      const songRepositoryPostgres = new SongRepositoryPostgres(pool, {});
      // Action
      const songs = await songRepositoryPostgres.getSongs();
      // Assert
      expect(songs).toHaveLength(1);
    });
  });
  describe('getSongById', () => {
    it('should return song correctly', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-0001' });
      const id = 'song-0001';
      await SongsTableTestHelper.addSong({ id });
      const songRepositoryPostgres = new SongRepositoryPostgres(pool, {});
      // Action
      const song = await songRepositoryPostgres.getSongById({ id });
      // Arrange
      expect(song).toHaveLength(1);
    });
  });
  describe('editSongById', () => {
    it('should persist editSongById', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-0001' });
      const id = 'song-0001';
      await SongsTableTestHelper.addSong({ id });
      const editSongPayload = {
        id,
        ...new AddSong({
          title: 'title-test',
          year: 1234,
          genre: 'genre-test',
          performer: 'performer-test',
          duration: 301,
          albumId: 'album-0001',
        }),
      };
      const songRepositoryPostgres = new SongRepositoryPostgres(pool, {});
      // Action
      await songRepositoryPostgres.editSongById(editSongPayload);
      // Assert
      const song = await SongsTableTestHelper.findSong(id);
      expect(song).toHaveLength(1);
    });
  });
  describe('deleteSongById', () => {
    it('should persist deleteSongById ', async () => {
      // Arrange
      const id = 'song-0001';
      await AlbumsTableTestHelper.addAlbum({ id: 'album-0001' });
      await SongsTableTestHelper.addSong({ id });
      const songRepositoryPostgres = new SongRepositoryPostgres(pool, {});
      // Action
      await songRepositoryPostgres.deleteSongById({ id });
      // Arrange
      const song = await SongsTableTestHelper.findSong();
      expect(song).toHaveLength(0);
    });
  });
  describe('checkAvailableSongId', () => {
    it('should throw error when is not unavailable', async () => {
      // Arrange
      const id = 'song-0001';
      const songRepositoryPostgres = new SongRepositoryPostgres(pool, {});
      // Action and Assert
      await expect(songRepositoryPostgres.checkAvailableSongId({ id }))
        .rejects.toThrowError(NotFoundError);
    });
    it('should not throw error when id available', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-0001' });
      const id = 'song-0001';
      await SongsTableTestHelper.addSong({ id });
      const songRepositoryPostgres = new SongRepositoryPostgres(pool, {});
      // Action and Assert
      await expect(songRepositoryPostgres.checkAvailableSongId({ id }))
        .resolves.not.toThrowError(NotFoundError);
    });
  });
});
