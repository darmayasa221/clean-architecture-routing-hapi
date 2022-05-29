const AddedSong = require('../../Domains/songs/entities/AddedSong');
const AddSong = require('../../Domains/songs/entities/AddSong');
const GetedSong = require('../../Domains/songs/entities/GetedSong');
const GetedSongs = require('../../Domains/songs/entities/GetedSongs');
const VerifyParamsSong = require('../../Domains/songs/entities/VerifyParamsSong');

class SongUseCase {
  constructor({ songRepository }) {
    this._songRepository = songRepository;
  }

  async addSong(payload) {
    const addSong = new AddSong(payload);
    const addedSong = await this._songRepository.addSong(addSong);
    return new AddedSong(addedSong);
  }

  async getSongs() {
    const songs = await this._songRepository.getSongs();
    const songsVerified = new GetedSongs(songs);
    return songsVerified.songs;
  }

  async getSongById(payload) {
    const songId = new VerifyParamsSong(payload);
    await this._songRepository.checkAvailableSongId(songId);
    const song = await this._songRepository.getSongById(songId);
    return new GetedSong(song);
  }

  async editSongById(payload) {
    const songId = new VerifyParamsSong({ songId: payload.songId });
    const newSong = new AddSong(payload);
    await this._songRepository.checkAvailableSongId(songId);
    await this._songRepository.editSongById({ ...songId, ...newSong });
  }

  async deleteSongById(payload) {
    const songId = new VerifyParamsSong(payload);
    await this._songRepository.checkAvailableSongId(songId);
    await this._songRepository.deleteSongById(songId);
  }
}

module.exports = SongUseCase;
