const AlbumRepository = require('../AlbumRepository');

describe('AlbumRepository', () => {
  it('should throw error when invoked abstract behavior', async () => {
    // Arrange
    const albumRepository = new AlbumRepository();
    // Action and Arrange
    await expect(albumRepository.addAlbum({})).rejects.toThrowError('ALBUM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(albumRepository.getAlbumById('')).rejects.toThrowError('ALBUM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(albumRepository.editAlbumById({})).rejects.toThrowError('ALBUM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(albumRepository.deleteAlbumById('')).rejects.toThrowError('ALBUM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(albumRepository.checkAvailableAlbumId('')).rejects.toThrowError('ALBUM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
