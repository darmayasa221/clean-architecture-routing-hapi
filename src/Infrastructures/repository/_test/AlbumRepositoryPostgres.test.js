const pool = require('../../database/postgres/pool');
const AlbumRepositoryPostgres = require('../AlbumRepositoryPostgres');
const AlbumsTableTestHelper = require('../../../../tests/AlbumsTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('AlbumRepositoryPostgres', () => {
  afterAll(async () => {
    await pool.end();
  });
  afterEach(async () => {
    await AlbumsTableTestHelper.cleanTable();
  });
  describe('addAlbum', () => {
    it('should persist addAlbum ', async () => {
      // Arrange
      const addAlbum = {
        name: 'album-name',
        year: '1234',
      };
      const fakeIdGenerator = () => '0001'; // stub
      const albumRepositoryPostgres = new AlbumRepositoryPostgres(pool, fakeIdGenerator);
      // Acction
      await albumRepositoryPostgres.addAlbum(addAlbum);
      // Assert
      const album = await AlbumsTableTestHelper.findAlbum('album-0001');
      expect(album).toHaveLength(1);
    });
    it('should return addedAlbum correctly', async () => {
      // Arrange
      const addAlbum = {
        name: 'album-name',
        year: '1234',
      };
      const fakeIdGenerator = () => '0001'; // stub
      const albumRepositoryPostgres = new AlbumRepositoryPostgres(pool, fakeIdGenerator);
      // Acction
      const album = await albumRepositoryPostgres.addAlbum(addAlbum);
      // Assert
      expect(album.id).toEqual('album-0001');
    });
  });
  describe('getAlbumById', () => {
    it('should return albumById correctly', async () => {
      // Arrange
      const id = 'album-0001';
      await AlbumsTableTestHelper.addAlbum({ id });
      const albumRepositoryPostgres = new AlbumRepositoryPostgres(pool, {});
      // Action
      const album = await albumRepositoryPostgres.getAlbumById(id);
      // Assert
      expect(album).toHaveLength(1);
    });
  });
  describe('editAlbumById', () => {
    it('should persist editAlbumById', async () => {
      // Arrange
      const id = 'album-0001';
      const editAlbum = {
        id,
        name: 'album-edit',
        year: 2000,
      };
      await AlbumsTableTestHelper.addAlbum({ id });
      const albumRepositoryPostgres = new AlbumRepositoryPostgres(pool, {});
      // Action
      await albumRepositoryPostgres.editAlbumById(editAlbum);
      // Assert
      const editedAlbum = await AlbumsTableTestHelper.findAlbum(id);
      expect(editedAlbum).toStrictEqual(editAlbum);
    });
  });
  describe('deleteAlbumById', () => {
    it('should persist deleteAlbumById', async () => {
      // Arrange
      const id = 'album-0001';
      await AlbumsTableTestHelper.addAlbum({ id });
      const albumRepositoryPostgres = new AlbumRepositoryPostgres(pool, {});
      // Action
      await albumRepositoryPostgres.deleteAlbumById(id);
      // Assert
      const album = await AlbumsTableTestHelper.findAlbum(id);
      expect(album).toHaveLength(0);
    });
  });
  describe('checkAvailableAlbumId', () => {
    it('should trow error when id unavailable', async () => {
      // Arrange
      const id = 'album-0001';
      const albumRepositoryPostgres = new AlbumRepositoryPostgres(pool, {});
      // Action and Assert
      await expect(albumRepositoryPostgres.checkAvailableAlbumId(id))
        .rejects.toThrowError(NotFoundError);
    });
    it('should not throw error when id available', async () => {
      // Arrange
      const id = 'album-0001';
      await AlbumsTableTestHelper.addAlbum({ id });
      const albumRepositoryPostgres = new AlbumRepositoryPostgres(pool, {});
      // Action and Assert
      await expect(albumRepositoryPostgres.checkAvailableAlbumId(id))
        .resolves.not.toThrowError(NotFoundError);
    });
  });
});
