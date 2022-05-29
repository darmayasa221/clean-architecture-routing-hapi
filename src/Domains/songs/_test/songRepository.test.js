const SongRepository = require('../SongRepository');

describe('SongRepository', () => {
  it('should throw error when invoked abstract behavior', async () => {
    // Arrange
    const songRepository = new SongRepository();
    // Action and Assert
    await expect(songRepository.addSong({})).rejects.toThrowError('SONG_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(songRepository.getSongs()).rejects.toThrowError('SONG_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(songRepository.getSongById('')).rejects.toThrowError('SONG_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(songRepository.editSongById({})).rejects.toThrowError('SONG_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(songRepository.deleteSongById('')).rejects.toThrowError('SONG_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(songRepository.checkAvailableSongId('')).rejects.toThrowError('SONG_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
