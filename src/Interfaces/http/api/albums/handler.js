const AlbumUseCase = require('../../../../Applications/use_case/AlbumUseCase');

class AlbumsHandlers {
  constructor(container) {
    this._container = container;
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler({ payload }, h) {
    const albumsUseCase = this._container.getInstance(AlbumUseCase.name);
    const { id } = await albumsUseCase.addAlbum(payload);
    const response = h.response({
      status: 'success',
      data: {
        albumId: id,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler({ params }, h) {
    const albumsUseCase = this._container.getInstance(AlbumUseCase.name);
    const album = await albumsUseCase.getAlbumById(params);
    return h.response({
      status: 'success',
      data: {
        album,
      },
    });
  }

  async putAlbumByIdHandler({ params, payload }, h) {
    const albumsUseCase = this._container.getInstance(AlbumUseCase.name);
    await albumsUseCase.editAlbumById({ ...params, ...payload });
    return h.response({
      status: 'success',
      message: 'updated success',
    });
  }

  async deleteAlbumByIdHandler({ params }, h) {
    const albumsUseCase = this._container.getInstance(AlbumUseCase.name);
    await albumsUseCase.deleteAlbumById(params);
    return h.response({
      status: 'success',
      message: 'deleted success',
    });
  }
}

module.exports = AlbumsHandlers;
