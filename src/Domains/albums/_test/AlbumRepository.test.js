const AlbumRepository = require('../AlbumRepository');

describe('AlbumRepository', () => {
  it('should throw error when invoked abstract behavior', async () => {
    // Arrange
    const albumRepository = new AlbumRepository();
    // Action and Arrange
    expect(albumRepository.addAlbum({})).rejects.toThrowError('ALBUM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(albumRepository.getAlbumById('')).rejects.toThrowError('ALBUM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(albumRepository.editAlbumById({})).rejects.toThrowError('ALBUM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(albumRepository.deleteAlbumById('')).rejects.toThrowError('ALBUM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
