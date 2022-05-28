const AddAlbum = require('../../Domains/albums/entities/AddAlbum');
const AddedAlbum = require('../../Domains/albums/entities/AddedAlbum');
const GetedAlbum = require('../../Domains/albums/entities/GetedAlbum');
const VerifyParamsAlbum = require('../../Domains/albums/entities/VerifyParamsAlbum');

class AlbumUseCase {
  constructor({ albumRepository }) {
    this._albumRepository = albumRepository;
  }

  async addAlbum(payload) {
    const addAlbum = new AddAlbum(payload);
    const addedAlbum = await this._albumRepository.addAlbum(addAlbum);
    return new AddedAlbum(addedAlbum);
  }

  async getAlbumById(payload) {
    const albumId = new VerifyParamsAlbum(payload);
    await this._albumRepository.checkAvailableAlbumId(albumId);
    const album = await this._albumRepository.getAlbumById(albumId);
    return new GetedAlbum(album);
  }

  async editAlbumById(payload) {
    const albumId = new VerifyParamsAlbum({ albumId: payload.albumId });
    const newAlbum = new AddAlbum(payload);
    await this._albumRepository.checkAvailableAlbumId(albumId);
    await this._albumRepository.editAlbumById({ ...albumId, ...newAlbum });
  }

  async deleteAlbumById(payload) {
    const albumId = new VerifyParamsAlbum(payload);
    await this._albumRepository.checkAvailableAlbumId(albumId);
    await this._albumRepository.deleteAlbumById(albumId);
  }
}

module.exports = AlbumUseCase;
